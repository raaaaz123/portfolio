/** Shared, component-free constants (kept out of component files for fast refresh). */
import { projects } from '../data/projects';

/** The one easing curve used across the site. */
export const ease = [0.22, 1, 0.36, 1] as const;

export const navLinks = [
  { name: 'Products', href: '#products' },
  { name: 'Case studies', href: '#case-studies' },
  { name: 'Work', href: '#work' },
  { name: 'Awards', href: '#awards' },
  { name: 'Stack', href: '#stack' },
  { name: 'Experience', href: '#experience' },
];

/** "2k+" → 2000, "600" → 600. */
const parseUsers = (u?: string) => {
  if (!u) return 0;
  const n = parseFloat(u);
  return /k/i.test(u) ? n * 1000 : n;
};

const totalUsers = projects.reduce((sum, p) => sum + parseUsers(p.users), 0);

/** Rounded down so the claim is never inflated: 68150 → "68k". */
export const usersReached = `${Math.floor(totalUsers / 1000)}k`;
export const productsShipped = projects.length;

/** Scroll to an in-page anchor through Lenis when it's running. */
export const scrollToHash = (hash: string) => {
  const el = document.querySelector(hash);
  if (!el) return;
  const lenis = (window as unknown as { __lenis?: { scrollTo: (t: Element, o?: object) => void } })
    .__lenis;
  if (lenis) lenis.scrollTo(el, { offset: 0, duration: 1.3 });
  else el.scrollIntoView({ behavior: 'smooth' });
  history.replaceState(null, '', hash);
};

/** Opens a project's detail sheet; App listens for this. */
export const OPEN_PROJECT_EVENT = 'portfolio:open-project';
export const openProject = (id: number) =>
  window.dispatchEvent(new CustomEvent(OPEN_PROJECT_EVENT, { detail: id }));

/** Opens the hire dialog from anywhere; App listens for this. */
export const HIRE_EVENT = 'portfolio:hire';
export const openHire = () => window.dispatchEvent(new Event(HIRE_EVENT));

/** Opens the ⌘K menu from anywhere. */
export const COMMAND_EVENT = 'portfolio:command';
export const openCommand = () => window.dispatchEvent(new Event(COMMAND_EVENT));

/** The products that lead the page. All live, all with store or site links. */
export const FLAGSHIP_IDS = [4, 100, 104, 101];

/** Lets long dotted names ("Notes.chatlo.io") wrap after each dot instead of overflowing. */
export const breakable = (s: string) => s.replace(/\./g, '.​');
