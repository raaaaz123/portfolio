import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalInfo } from '../data/personalInfo';
import { FiCommand } from 'react-icons/fi';
import { ease, navLinks, openCommand, scrollToHash } from '../lib/ui';

const TICKER = [
  'RAG pipelines',
  'AI agents',
  'Voice agents',
  'SaaS platforms',
  'iOS & Android',
  'Next.js',
  'FastAPI',
  'Vector search',
  'LLM integrations',
];

const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string, after?: () => void) => {
  e.preventDefault();
  after?.();
  scrollToHash(href);
};

const Ticker = () => {
  const row = (hidden?: boolean) => (
    <div className="flex shrink-0" aria-hidden={hidden || undefined}>
      {TICKER.map((t) => (
        <span key={t} className="flex items-center gap-5 pr-5 text-[12px] font-semibold">
          {t}
          <span className="text-[9px]" aria-hidden="true">
            ✦
          </span>
        </span>
      ))}
    </div>
  );
  return (
    <div className="overflow-hidden border-b-[1.5px] border-ink bg-pop py-1.5 text-ink">
      <div className="flex w-max animate-[marquee_38s_linear_infinite] motion-reduce:animate-none">
        {row()}
        {row(true)}
      </div>
    </div>
  );
};

const Navbar: React.FC<{ activeSection: string; onHire: () => void }> = ({
  activeSection,
  onHire,
}) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: { stop(): void; start(): void } }).__lenis;
    if (open) lenis?.stop();
    else lenis?.start();
    document.documentElement.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.3, ease }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <Ticker />
        <div className="border-b-[1.5px] border-ink bg-paper/90 backdrop-blur-md">
          <div className="shell flex items-center gap-4 py-3">
            <a
              href="#home"
              onClick={(e) => go(e, '#home')}
              className="display flex-1 whitespace-nowrap py-2 text-[24px] text-ink [--wdth:78]"
            >
              {personalInfo.name}
              <sup className="ml-0.5 text-[10px] text-moss">AI</sup>
            </a>

            <nav className="hidden items-center gap-1 lg:flex" aria-label="Sections">
              {navLinks.map((link) => {
                const active = activeSection === link.href.slice(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => go(e, link.href)}
                    aria-current={active ? 'true' : undefined}
                    className="relative rounded-full px-4 py-1.5 text-[14px] font-semibold"
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-full border-[1.5px] border-ink bg-ink"
                        transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      />
                    )}
                    <span
                      className={`relative transition-colors ${
                        active ? 'text-paper' : 'text-ink/60 hover:text-ink'
                      }`}
                    >
                      {link.name}
                    </span>
                  </a>
                );
              })}
            </nav>

            <div className="flex flex-1 items-center justify-end gap-2">
              <button
                type="button"
                onClick={openCommand}
                aria-label="Open command menu"
                className="hidden items-center gap-1.5 rounded-full border-[1.5px] border-ink/25 px-3 py-1.5 font-mono text-[12px] text-ink/70 transition-colors hover:border-ink hover:text-ink xl:flex"
              >
                <FiCommand aria-hidden="true" /> K
              </button>
              <button
                type="button"
                onClick={onHire}
                className="pill hidden border-[1.5px] border-ink bg-pop px-5 py-2 text-[14px] text-ink sm:inline-flex"
              >
                <span className="pill-roll">
                  <span>Hire me</span>
                  <span aria-hidden="true">Hire me</span>
                </span>
              </button>
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="pill ml-2 border-[1.5px] border-ink px-5 py-2 text-[14px] text-ink lg:hidden"
                aria-expanded={open}
                aria-controls="mobile-menu"
              >
                Menu
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.7, ease }}
            className="fixed inset-0 z-[60] flex flex-col bg-ink text-paper"
          >
            <div className="shell flex items-center justify-between py-4">
              <span className="display text-[24px] [--wdth:78]">{personalInfo.name}</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="pill bg-paper px-5 py-2 text-[14px] text-ink"
                autoFocus
              >
                Close
              </button>
            </div>
            <nav className="shell mt-8 flex flex-col" aria-label="Sections">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => go(e, link.href, () => setOpen(false))}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + i * 0.06, duration: 0.6, ease }}
                  className="display border-b-[1.5px] border-paper/25 py-3 text-[18vw]"
                >
                  {link.name}
                </motion.a>
              ))}
            </nav>
            <div className="shell mt-auto pb-8">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  onHire();
                }}
                className="pill w-full bg-pop text-ink"
              >
                Get in touch
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
