import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalInfo } from '../data/personalInfo';
import { ease, navLinks } from '../lib/ui';
import usePointerGlow from '../hooks/usePointerGlow';
import ThemeToggle from './ThemeToggle';

interface NavbarProps {
  activeSection: string;
}

const Wordmark = () => (
  <span className="label text-foreground">
    {personalInfo.name.split(' ')[0].toLowerCase()}
    <span className="text-primary">.</span>
  </span>
);

const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [open, setOpen] = useState(false);
  const glow = usePointerGlow();

  // Lock the page while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.15, ease }}
        className="fixed inset-x-0 top-3 z-50 sm:top-4"
      >
        <div className="shell flex justify-center">
          <nav
            onPointerMove={glow}
            className="glass spotlight flex items-center gap-1 rounded-full px-2 py-1.5 sm:gap-2"
          >
            <a href="#home" className="rounded-full px-3 py-1.5">
              <Wordmark />
            </a>

            <span className="hidden h-3.5 w-px bg-foreground/15 sm:block" aria-hidden="true" />

            <div className="hidden items-center sm:flex">
              {navLinks.map((link) => {
                const active = activeSection === link.href.slice(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    aria-current={active ? 'true' : undefined}
                    className="relative rounded-full px-3.5 py-1.5"
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-full bg-foreground/[0.07] ring-1 ring-inset ring-foreground/10 dark:bg-white/[0.09]"
                        transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      />
                    )}
                    <span
                      className={`label relative transition-colors ${
                        active ? 'text-primary' : 'hover:text-foreground'
                      }`}
                    >
                      {link.name}
                    </span>
                  </a>
                );
              })}
            </div>

            <span className="h-3.5 w-px bg-foreground/15" aria-hidden="true" />

            <div className="px-3 py-1.5">
              <ThemeToggle />
            </div>

            <button
              onClick={() => setOpen(true)}
              className="label rounded-full px-3 py-1.5 hover:text-foreground sm:hidden"
              aria-label="Open menu"
            >
              Menu
            </button>
          </nav>
        </div>
      </motion.header>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-background/85 backdrop-blur-2xl sm:hidden"
          >
            <div className="shell flex h-[4.25rem] items-center justify-between">
              <Wordmark />
              <button
                onClick={() => setOpen(false)}
                className="label hover:text-foreground"
                aria-label="Close menu"
              >
                Close
              </button>
            </div>

            <nav className="shell mt-10 flex flex-col">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i, duration: 0.45, ease }}
                  className="flex items-baseline gap-4 border-b border-hairline py-5"
                >
                  <span className="label tabular-nums text-primary">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-display text-3xl font-light tracking-tight text-foreground">
                    {link.name}
                  </span>
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
