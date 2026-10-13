/**
 * One conversation shared by the hero box and the floating chat panel.
 * Questions go to /api/chat (Kimi K2.5 on Bedrock, with the whole portfolio
 * as context) and the answer streams in. If the model can't be reached, a
 * local keyword search answers instead.
 */
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { ask, type Source } from '../lib/ask';
import useAnalytics from './usePostHog';

export type Phase = 'thinking' | 'streaming' | 'done';

export interface Turn {
  id: number;
  q: string;
  /** Raw model output, including the trailing SOURCES line. */
  raw: string;
  phase: Phase;
  /** Seconds until the whole answer arrived. */
  took?: number;
  /** Answered by local search because the model call failed. */
  fallback?: Source[];
  error?: string;
}

export interface Chat {
  turns: Turn[];
  busy: boolean;
  submit: (q: string) => void;
  clear: () => void;
  dockOpen: boolean;
  setDockOpen: (open: boolean) => void;
}

export const ChatContext = createContext<Chat | null>(null);

export const useChat = () => {
  const chat = useContext(ChatContext);
  if (!chat) throw new Error('useChat must be used inside <ChatProvider>');
  return chat;
};

export const useChatState = (): Chat => {
  const { trackEvent } = useAnalytics();
  const [turns, setTurns] = useState<Turn[]>([]);
  const [dockOpen, setDockOpen] = useState(false);
  const abort = useRef<AbortController | null>(null);
  const turnsRef = useRef(turns);
  turnsRef.current = turns;
  const busy = turns.some((t) => t.phase !== 'done');

  const submit = useCallback(
    async (raw: string) => {
      const q = raw.trim().slice(0, 600);
      if (!q || turnsRef.current.some((t) => t.phase !== 'done')) return;
      const id = Date.now();
      const started = performance.now();
      const history = turnsRef.current
        .filter((t) => !t.error)
        .flatMap((t) => [
          { role: 'user' as const, content: t.q },
          { role: 'assistant' as const, content: t.raw },
        ]);

      setTurns((ts) => [...ts.slice(-5), { id, q, raw: '', phase: 'thinking' }]);
      const update = (fn: (t: Turn) => Turn) => setTurns((ts) => ts.map((t) => (t.id === id ? fn(t) : t)));

      const controller = new AbortController();
      abort.current = controller;

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ messages: [...history, { role: 'user', content: q }] }),
          signal: controller.signal,
        });
        if (res.status === 429) {
          const { error } = await res.json().catch(() => ({ error: 'Too many questions in a row.' }));
          update((t) => ({ ...t, phase: 'done', error }));
          return;
        }
        if (!res.ok || !res.body) throw new Error(`status ${res.status}`);

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          const piece = decoder.decode(value, { stream: true });
          update((t) => ({ ...t, raw: t.raw + piece, phase: 'streaming' }));
        }
        update((t) => ({ ...t, phase: 'done', took: (performance.now() - started) / 1000 }));
        trackEvent('ask_ai', { question: q, model: 'kimi-k2.5' });
      } catch (err) {
        if ((err as Error).name === 'AbortError') return;
        const local = ask(q);
        update((t) => ({ ...t, raw: local.text, phase: 'done', fallback: local.sources }));
        trackEvent('ask_ai', { question: q, model: 'local-fallback' });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const clear = useCallback(() => {
    abort.current?.abort();
    setTurns([]);
  }, []);

  useEffect(() => () => abort.current?.abort(), []);

  return { turns, busy, submit, clear, dockOpen, setDockOpen };
};
