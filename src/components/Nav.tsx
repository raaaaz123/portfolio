import { useEffect, useState } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';
import { navLinks, openCommand, toggleTheme } from '../lib/ui';

const Nav: React.FC<{ active: string }> = ({ active }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 bg-canvas/85 backdrop-blur transition-[border-color] ${
        scrolled ? 'border-b border-line' : 'border-b border-transparent'
      }`}
    >
      <nav className="page flex h-14 items-center justify-between gap-6 text-[15px]">
        <a href="#top" className="font-semibold tracking-[-0.01em]">
          Rasheed M
        </a>

        <div className="flex items-center gap-5">
          <ul className="hidden items-center gap-5 sm:flex">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={`transition-colors hover:text-ink ${active === l.href.slice(1) ? 'text-ink' : 'text-muted'}`}
                >
                  {l.name}
                </a>
              </li>
            ))}
          </ul>
          <button type="button" onClick={openCommand} className="text-muted transition-colors hover:text-ink">
            <span className="sm:hidden">Menu</span>
            <span className="hidden sm:inline">
              Search <kbd className="font-sans text-[13px] opacity-70">⌘K</kbd>
            </span>
          </button>
          <a href="#contact" className="btn-ink hidden h-9 px-4 text-[14px] md:inline-flex">
            Get in touch
          </a>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Switch between light and dark"
            className="-mr-1 grid h-8 w-8 place-items-center text-muted transition-colors hover:text-ink"
          >
            <FiSun className="hidden h-[17px] w-[17px] dark:block" />
            <FiMoon className="h-[17px] w-[17px] dark:hidden" />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
