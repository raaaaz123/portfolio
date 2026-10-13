import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { IconType } from 'react-icons';
import { FiCopy, FiDownload, FiFolder, FiHash, FiMessageSquare, FiMoon, FiSearch } from 'react-icons/fi';
import { projects } from '../data/projects';
import { personalInfo } from '../data/personalInfo';
import { COMMAND_EVENT, focusAsk, navLinks, openProject, scrollToHash, toggleTheme } from '../lib/ui';

interface Item {
  id: string;
  group: string;
  label: string;
  hint?: string;
  Icon: IconType;
  run: () => void;
}

const ITEMS: Item[] = [
  { id: 'ask', group: 'Ask', label: 'Ask a question about my work', Icon: FiMessageSquare, run: () => focusAsk() },
  ...navLinks.map((l) => ({
    id: l.href,
    group: 'Go to',
    label: l.name,
    Icon: FiHash,
    run: () => scrollToHash(l.href),
  })),
  ...projects.map((p) => ({
    id: `p-${p.id}`,
    group: 'Projects',
    label: p.title,
    hint: p.summary,
    Icon: FiFolder,
    run: () => openProject(p.id),
  })),
  {
    id: 'copy',
    group: 'Actions',
    label: 'Copy email',
    hint: personalInfo.email,
    Icon: FiCopy,
    run: () => navigator.clipboard?.writeText(personalInfo.email),
  },
  {
    id: 'resume',
    group: 'Actions',
    label: 'Download résumé',
    Icon: FiDownload,
    run: () => window.open(personalInfo.resumeUrl, '_blank'),
  },
  { id: 'theme', group: 'Actions', label: 'Switch between light and dark', Icon: FiMoon, run: toggleTheme },
];

const CommandMenu: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [sel, setSel] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === 'Escape') setOpen(false);
    };
    const onOpen = () => setOpen(true);
    window.addEventListener('keydown', onKey);
    window.addEventListener(COMMAND_EVENT, onOpen);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener(COMMAND_EVENT, onOpen);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    setQ('');
    setSel(0);
    const t = setTimeout(() => input.current?.focus(), 20);
    return () => clearTimeout(t);
  }, [open]);

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return ITEMS;
    const matched = ITEMS.filter((i) => `${i.label} ${i.hint ?? ''} ${i.group}`.toLowerCase().includes(s));
    // Anything unmatched can still be sent to Ask AI as a question.
    return [
      ...matched,
      {
        id: 'ask-q',
        group: 'Ask',
        label: `Ask: “${q.trim()}”`,
        Icon: FiMessageSquare,
        run: () => focusAsk(q.trim()),
      },
    ];
  }, [q]);

  useEffect(() => {
    list.current?.querySelector(`[data-i="${sel}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [sel]);

  const run = (i: Item) => {
    setOpen(false);
    setTimeout(i.run, 60);
  };

  let lastGroup = '';

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-[14vh]">
          <motion.div
            className="absolute inset-0 bg-ink/25"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command menu"
            initial={{ opacity: 0, scale: 0.98, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="relative w-full max-w-[560px] overflow-hidden rounded-lg border border-line bg-surface shadow-[0_24px_60px_-20px_rgb(0_0_0/0.35)]"
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <FiSearch className="h-4 w-4 text-muted" />
              <input
                ref={input}
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setSel(0);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    setSel((s) => Math.min(s + 1, results.length - 1));
                  } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    setSel((s) => Math.max(s - 1, 0));
                  } else if (e.key === 'Enter' && results[sel]) run(results[sel]);
                }}
                placeholder="Search projects, sections, or ask a question…"
                className="h-12 flex-1 bg-transparent text-[15px] outline-none placeholder:text-muted"
              />
              <span className="text-[13px] text-muted">Esc</span>
            </div>
            <ul ref={list} className="max-h-[52vh] overflow-y-auto p-2">
              {results.map((item, i) => {
                const header = item.group !== lastGroup;
                lastGroup = item.group;
                return (
                  <li key={item.id}>
                    {header && <p className="px-2 pb-1 pt-3 text-[13px] text-muted first:pt-1">{item.group}</p>}
                    <button
                      type="button"
                      data-i={i}
                      onMouseMove={() => setSel(i)}
                      onClick={() => run(item)}
                      className={`flex w-full items-center gap-3 rounded-md px-2 py-2 text-left text-[14px] ${
                        sel === i ? 'bg-canvas text-ink' : 'text-ink/85'
                      }`}
                    >
                      <item.Icon className="h-4 w-4 shrink-0 text-muted" />
                      <span className="shrink-0">{item.label}</span>
                      {item.hint && <span className="truncate text-[12.5px] text-muted">{item.hint}</span>}
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CommandMenu;
