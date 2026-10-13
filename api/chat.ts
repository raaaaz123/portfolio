/**
 * POST /api/chat — streams a Kimi K2.5 answer (via Amazon Bedrock) about the
 * portfolio. The Bedrock key stays on the server; the browser only ever sees
 * answer text.
 *
 * Runs as a Vercel Edge function in production and through a Vite middleware
 * in development (see vite.config.ts). Both hand it a standard Request.
 *
 * Env: BEDROCK_API_KEY (required), BEDROCK_REGION (default us-east-1),
 *      BEDROCK_MODEL (default moonshotai.kimi-k2.5).
 */
import { systemPrompt } from '../src/lib/context';

export const config = { runtime: 'edge' };

interface Turn {
  role: 'user' | 'assistant';
  content: string;
}

const MAX_TURNS = 8;
const MAX_CHARS = 600;

// Best-effort per-instance limit so a public endpoint can't run up the bill.
const WINDOW_MS = 10 * 60_000;
const MAX_REQUESTS = 20;
const hits = new Map<string, number[]>();

const limited = (ip: string) => {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_REQUESTS;
};

const json = (status: number, error: string) =>
  new Response(JSON.stringify({ error }), { status, headers: { 'content-type': 'application/json' } });

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') return json(405, 'Method not allowed');

  const key = process.env.BEDROCK_API_KEY;
  if (!key) return json(500, 'Chat is not configured');

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'local';
  if (limited(ip)) return json(429, 'Too many questions — try again in a few minutes.');

  let messages: Turn[];
  try {
    const body = (await req.json()) as { messages?: Turn[] };
    messages = (body.messages ?? [])
      .filter((m) => (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
      .slice(-MAX_TURNS)
      .map((m) => ({ role: m.role, content: m.content.slice(0, m.role === 'user' ? MAX_CHARS : 4000) }));
  } catch {
    return json(400, 'Bad request');
  }
  if (!messages.length || messages[messages.length - 1].role !== 'user') return json(400, 'Bad request');

  const region = process.env.BEDROCK_REGION || 'us-east-1';
  const upstream = await fetch(`https://bedrock-mantle.${region}.api.aws/v1/chat/completions`, {
    method: 'POST',
    headers: { authorization: `Bearer ${key}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      model: process.env.BEDROCK_MODEL || 'moonshotai.kimi-k2.5',
      stream: true,
      max_tokens: 800,
      temperature: 0.2,
      messages: [{ role: 'system', content: systemPrompt() }, ...messages],
    }),
  }).catch(() => null);

  if (!upstream?.ok || !upstream.body) {
    const detail = upstream ? await upstream.text().catch(() => '') : 'network error';
    console.error('bedrock error', upstream?.status, detail.slice(0, 500));
    return json(502, 'The model is unavailable right now.');
  }

  // Re-emit only the answer text, as a plain UTF-8 stream.
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buffer = '';
  const text = upstream.body.pipeThrough(
    new TransformStream<Uint8Array, Uint8Array>({
      transform(chunk, controller) {
        buffer += decoder.decode(chunk, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';
        for (const line of lines) {
          if (!line.startsWith('data:')) continue;
          const data = line.slice(5).trim();
          if (!data || data === '[DONE]') continue;
          try {
            const delta = JSON.parse(data).choices?.[0]?.delta?.content;
            if (delta) controller.enqueue(encoder.encode(delta));
          } catch {
            /* partial or non-JSON line */
          }
        }
      },
    }),
  );

  return new Response(text, {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'no-store',
      'x-model': process.env.BEDROCK_MODEL || 'moonshotai.kimi-k2.5',
    },
  });
}
