import { Fragment, useEffect, useRef, useState } from 'react';
import { SUGGESTIONS, type Source } from '../lib/ask';
import { useChat, type Turn } from '../hooks/useChat';
import { openProject, scrollToHash } from '../lib/ui';
import { projects } from '../data/projects';

const SECTION_LABELS: Record<string, string> = {
  experience: 'Experience',
  stack: 'Stack',
  awards: 'Awards',
  contact: 'Contact',
};

/** Splits "answer…\nSOURCES: p4, experience" into display text and sources. */
const parse = (raw: string) => {
  const at = raw.search(/\n?\s*SOURCES:/);
  // While streaming, hide a half-written "SOUR…" marker too.
  const text = (at >= 0 ? raw.slice(0, at) : raw.replace(/\n\s*S(?:O(?:U(?:R(?:C(?:E(?:S)?)?)?)?)?)?$/, ''))
    .replace(/\s*\[cite:[^\]]*\]?/g, '')
    .trim();
  const ids = at >= 0 ? raw.slice(at).replace(/^\s*SOURCES:/, '').split(/[,\s]+/) : [];
  const sources: Source[] = [];
  for (const id of ids) {
    const p = /^p(\d+)$/.exec(id) && projects.find((x) => x.id === Number(id.slice(1)));
    if (p) sources.push({ kind: 'project', id: p.id, label: p.title });
    else if (SECTION_LABELS[id]) sources.push({ kind: 'section', href: `#${id}`, label: SECTION_LABELS[id] });
  }
  return { text, sources: sources.filter((s, i) => sources.findIndex((x) => x.label === s.label) === i) };
};

/** **bold** and `code` spans. */
const Inline: React.FC<{ text: string }> = ({ text }) => (
  <>
    {text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).map((part, i) =>
      part.startsWith('**') && part.endsWith('**') ? (
        <strong key={i} className="font-semibold">
          {part.slice(2, -2)}
        </strong>
      ) : part.startsWith('`') && part.endsWith('`') ? (
        <code key={i} className="rounded bg-white/10 px-1 font-mono text-[0.88em]">
          {part.slice(1, -1)}
        </code>
      ) : (
        <Fragment key={i}>{part}</Fragment>
      ),
    )}
  </>
);

const BULLET = /^\s*(?:[-*•]|\d+[.)])\s+/;

/** Paragraphs and bullet lists, rendered from a partially streamed string. */
const Markdown: React.FC<{ text: string; caret: boolean }> = ({ text, caret }) => {
  const blocks: { list: boolean; lines: string[] }[] = [];
  for (const raw of text.split('\n')) {
    const line = raw.replace(/^#+\s*/, '');
    const list = BULLET.test(line);
    const body = list ? line.replace(BULLET, '') : line;
    const prev = blocks[blocks.length - 1];
    if (!line.trim()) blocks.push({ list: false, lines: [] });
    else if (prev && prev.list === list && (list || prev.lines.length)) prev.lines.push(body);
    else blocks.push({ list, lines: [body] });
  }
  const shown = blocks.filter((b) => b.lines.length);
  const end = <span className="caret" />;

  return (
    <div className="space-y-3">
      {shown.map((b, i) => {
        const last = caret && i === shown.length - 1;
        return b.list ? (
          <ul key={i} className="list-disc space-y-1 pl-5 marker:text-white/40">
            {b.lines.map((l, j) => (
              <li key={j}>
                <Inline text={l} />
                {last && j === b.lines.length - 1 && end}
              </li>
            ))}
          </ul>
        ) : (
          <p key={i}>
            {b.lines.map((l, j) => (
              <Fragment key={j}>
                {j > 0 && <br />}
                <Inline text={l} />
              </Fragment>
            ))}
            {last && end}
          </p>
        );
      })}
      {caret && !shown.length && end}
    </div>
  );
};

const SourceLink: React.FC<{ s: Source }> = ({ s }) => (
  <button
    type="button"
    className="a text-[#a9bcff]"
    onClick={() => (s.kind === 'project' ? openProject(s.id) : scrollToHash(s.href))}
  >
    {s.label}
  </button>
);

/** "a", "a and b", "a, b and c" */
const joined = (items: React.ReactNode[]) =>
  items.map((it, i) => (
    <Fragment key={i}>
      {i > 0 && (i === items.length - 1 ? ' and ' : ', ')}
      {it}
    </Fragment>
  ));

const Answer: React.FC<{ t: Turn }> = ({ t }) => {
  const { text, sources } = t.fallback ? { text: t.raw, sources: t.fallback } : parse(t.raw);
  return (
    <div className="space-y-3">
      <div className="flex justify-end">
        <p className="max-w-[85%] rounded-2xl rounded-br-md bg-white px-3.5 py-2 text-[15px] text-[#14161a]">{t.q}</p>
      </div>
      <div className="text-[15px] leading-[1.65] text-white/85">
        {t.error ? (
          <p>{t.error}</p>
        ) : t.phase === 'thinking' ? (
          <p className="thinking text-white/55">Reading through the portfolio…</p>
        ) : (
          <Markdown text={text} caret={t.phase === 'streaming'} />
        )}
      </div>
      {t.phase === 'done' && !t.error && (
        <p className="text-[13px] text-white/50">
          {t.fallback
            ? 'The model couldn’t be reached, so this came from a plain text search of the page.'
            : `Kimi K2.5, ${t.took?.toFixed(1)}s.`}
          {sources.length > 0 && <> Based on {joined(sources.map((s) => <SourceLink key={s.label} s={s} />))}.</>}
        </p>
      )}
    </div>
  );
};

/**
 * The chat, drawn as one dark panel so it reads as the page's assistant
 * wherever it appears: large in the hero, compact in the floating dock.
 */
const AskAI: React.FC<{ variant?: 'hero' | 'dock'; onClose?: () => void }> = ({ variant = 'hero', onClose }) => {
  const { turns, busy, submit, clear } = useChat();
  const [value, setValue] = useState('');
  const input = useRef<HTMLTextAreaElement>(null);
  const thread = useRef<HTMLDivElement>(null);
  const dock = variant === 'dock';

  // Keep the newest message in view inside the thread.
  useEffect(() => {
    const el = thread.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [turns]);

  useEffect(() => {
    if (dock) input.current?.focus();
  }, [dock]);

  const send = (q: string) => {
    if (!q.trim() || busy) return;
    submit(q);
    setValue('');
  };

  return (
    <div
      id={dock ? undefined : 'hero-chat'}
      className={`flex flex-col overflow-hidden bg-[#14161a] text-white ring-1 ring-white/10 dark:bg-[#1c2026] ${
        dock ? 'h-full rounded-[24px]' : 'rounded-[24px] shadow-[0_30px_60px_-30px_rgb(0_0_0/0.55)]'
      }`}
    >
      <div className="flex items-center justify-between gap-3 px-5 pb-3 pt-4">
        <div>
          <p className="flex items-center gap-2 text-[16px] font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Ask my portfolio
          </p>
          <p className="mt-0.5 text-[13px] text-white/50">Answers questions about Rasheed M’s work, and nothing else.</p>
        </div>
        <div className="flex items-center gap-1">
          {turns.length > 0 && (
            <button type="button" onClick={clear} className="rounded-full px-3 py-1 text-[13px] text-white/60 hover:bg-white/10 hover:text-white">
              Clear
            </button>
          )}
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close chat"
              className="grid h-8 w-8 place-items-center rounded-full text-white/60 hover:bg-white/10 hover:text-white"
            >
              <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M4 4l8 8M12 4l-8 8" strokeLinecap="round" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {turns.length > 0 ? (
        <div
          ref={thread}
          className={`space-y-7 overflow-y-auto border-t border-white/10 px-5 py-5 ${dock ? 'flex-1' : 'max-h-[380px]'}`}
        >
          {turns.map((t) => (
            <Answer key={t.id} t={t} />
          ))}
        </div>
      ) : (
        <div className={`flex flex-wrap content-start gap-2 px-5 pb-4 ${dock ? 'flex-1' : ''}`}>
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => send(s)}
              className="rounded-full bg-white/[0.08] px-3.5 py-1.5 text-[13.5px] text-white/85 ring-1 ring-white/10 transition-colors hover:bg-white/15"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(value);
        }}
        className="p-3 pt-0"
      >
        <div className="flex items-end gap-2 rounded-2xl bg-white p-2 pl-4 text-[#14161a] focus-within:ring-2 focus-within:ring-[#a9bcff]">
          <label className="min-w-0 flex-1">
            <span className="sr-only">Ask a question about my work</span>
            <textarea
              ref={input}
              rows={1}
              value={value}
              maxLength={600}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  send(value);
                }
              }}
              placeholder={turns.length ? 'Ask a follow-up' : 'Ask anything about my work'}
              className="block max-h-32 w-full resize-none bg-transparent py-2 text-[16px] outline-none placeholder:text-black/40"
            />
          </label>
          <button
            type="submit"
            disabled={!value.trim() || busy}
            className="h-10 shrink-0 rounded-xl bg-[#14161a] px-5 text-[15px] font-medium text-white transition-opacity disabled:opacity-25"
          >
            Ask
          </button>
        </div>
      </form>
    </div>
  );
};

export default AskAI;
