import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { IconType } from 'react-icons';
import { SiGithub, SiLinkedin, SiWhatsapp } from 'react-icons/si';
import { FiBriefcase, FiCopy, FiDownload, FiHash, FiBox, FiSearch } from 'react-icons/fi';
import { personalInfo } from '../data/personalInfo';
import { projects } from '../data/projects';
import { COMMAND_EVENT, ease, navLinks, openHire, openProject, scrollToHash } from '../lib/ui';
import useAnalytics from '../hooks/usePostHog';

interface Item {
  id: string;
  group: string;
  label: string;
  hint?: string;
  Icon: IconType;
  run: () => void;
}

const external = (url: string) => window.open(url, '_blank', 'noopener,noreferrer');

/** ⌘K / Ctrl+K: every action on the page, a few keystrokes away. */
const CommandMenu = () => {
  const { trackEvent } = useAnalytics();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const input = useRef<HTMLInputElement>(null);

  const items = useMemo<Item[]>(
    () => [
      { id: 'hire', group: 'Actions', label: 'Get in touch with Rasheed', Icon: FiBriefcase, run: openHire },
      {
        id: 'copy',
        group: 'Actions',
        label: 'Copy email address',
        hint: personalInfo.email,
        Icon: FiCopy,
        run: () => {
          navigator.clipboard?.writeText(personalInfo.email);
          setToast('Email copied');
        },
      },
      { id: 'cv', group: 'Actions', label: 'Download résumé (PDF)', Icon: FiDownload, run: () => external(personalInfo.resumeUrl) },
      { id: 'gh', group: 'Links', label: 'GitHub', hint: 'raaaaz123', Icon: SiGithub, run: () => external(personalInfo.socialLinks.github) },
      { id: 'li', group: 'Links', label: 'LinkedIn', Icon: SiLinkedin, run: () => external(personalInfo.socialLinks.linkedin) },
      { id: 'wa', group: 'Links', label: 'WhatsApp', Icon: SiWhatsapp, run: () => external(personalInfo.socialLinks.whatsapp) },
      ...navLinks.map((l) => ({
        id: `nav-${l.href}`,
        group: 'Go to',
        label: l.name,
        Icon: FiHash,
        run: () => scrollToHash(l.href),
      })),
      { id: 'nav-contact', group: 'Go to', label: 'Contact', Icon: FiHash, run: () => scrollToHash('#contact') },
      ...projects.map((p) => ({
        id: `p-${p.id}`,
        group: 'Products',
        label: p.title,
        hint: p.summary,
        Icon: FiBox,
        run: () => openProject(p.id),
      })),
    ],
    [],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) => `${i.label} ${i.hint ?? ''} ${i.group}`.toLowerCase().includes(q));
  }, [items, query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      }
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
    const lenis = (window as unknown as { __lenis?: { stop(): void; start(): void } }).__lenis;
    if (open) {
      setQuery('');
      setActive(0);
      lenis?.stop();
      trackEvent('command_menu_open');
      setTimeout(() => input.current?.focus(), 30);
    } else lenis?.start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 1800);
    return () => clearTimeout(t);
  }, [toast]);

  const run = (item: Item) => {
    setOpen(false);
    trackEvent('command_run', { command: item.id });
    // Let the menu close before scrolling or opening dialogs.
    setTimeout(item.run, 120);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') setOpen(false);
    else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => Math.min(filtered.length - 1, a + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(0, a - 1));
    } else if (e.key === 'Enter' && filtered[active]) run(filtered[active]);
  };

  useEffect(() => {
    document.getElementById(`cmd-${active}`)?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  let lastGroup = '';

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[90] flex items-start justify-center bg-ink/60 p-4 pt-[12vh] backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Command menu"
              initial={{ y: -20, scale: 0.97, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: -10, scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.25, ease }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl overflow-hidden rounded-[20px] border-[1.5px] border-ink bg-paper text-ink shadow-[8px_8px_0_0_hsl(var(--pop))]"
            >
              <div className="flex items-center gap-3 border-b-[1.5px] border-ink/15 px-5">
                <FiSearch className="shrink-0 text-ink/50" aria-hidden="true" />
                <input
                  ref={input}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setActive(0);
                  }}
                  onKeyDown={onKeyDown}
                  placeholder="Search actions, links, products…"
                  className="h-14 flex-1 bg-transparent text-[16px] outline-none placeholder:text-ink/40"
                  aria-controls="cmd-list"
                  aria-activedescendant={filtered[active] ? `cmd-${active}` : undefined}
                />
                <kbd className="rounded-md border border-ink/20 px-1.5 py-0.5 font-mono text-[11px] text-ink/50">esc</kbd>
              </div>

              <ul id="cmd-list" role="listbox" data-lenis-prevent className="max-h-[52vh] overflow-y-auto p-2">
                {filtered.length === 0 && (
                  <li className="px-3 py-8 text-center text-[15px] text-ink/60">
                    Nothing matches “{query}”. Try “email” or a product name.
                  </li>
                )}
                {filtered.map((item, i) => {
                  const header = item.group !== lastGroup;
                  lastGroup = item.group;
                  return (
                    <li key={item.id} role="presentation">
                      {header && (
                        <p className="px-3 pb-1 pt-3 text-[12px] font-semibold text-ink/50">{item.group}</p>
                      )}
                      <button
                        id={`cmd-${i}`}
                        role="option"
                        aria-selected={i === active}
                        onMouseEnter={() => setActive(i)}
                        onClick={() => run(item)}
                        className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                          i === active ? 'bg-pop' : ''
                        }`}
                      >
                        <item.Icon className="shrink-0 text-[17px]" aria-hidden="true" />
                        <span className="shrink-0 text-[15px] font-semibold">{item.label}</span>
                        {item.hint && <span className="truncate text-[13px] text-ink/55">{item.hint}</span>}
                        {i === active && (
                          <kbd className="ml-auto shrink-0 font-mono text-[11px] text-ink/60">↵</kbd>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            role="status"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            className="fixed bottom-6 left-1/2 z-[95] -translate-x-1/2 rounded-full border-[1.5px] border-ink bg-pop px-5 py-2.5 text-[15px] font-semibold text-ink"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CommandMenu;
