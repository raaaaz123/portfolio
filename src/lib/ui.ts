/** Shared, component-free constants (kept out of component files for fast refresh). */
import { projects, type Project } from '../data/projects';

export const navLinks = [
  { name: 'Work', href: '#work' },
  { name: 'Experience', href: '#experience' },
  { name: 'Stack', href: '#stack' },
  { name: 'Contact', href: '#contact' },
];

/** "2k+" → 2000, "600" → 600. */
export const parseUsers = (u?: string) => {
  if (!u) return 0;
  const n = parseFloat(u);
  return /k/i.test(u) ? n * 1000 : n;
};

const totalUsers = projects.reduce((sum, p) => sum + parseUsers(p.users), 0);

/** Rounded down so the claim is never inflated: 68150 → "68k". */
export const usersReached = `${Math.floor(totalUsers / 1000)}k`;
export const productsShipped = projects.length;
export const liveCount = projects.filter((p) => p.status === 'live').length;

/** "5k+" → "5,000+ users" */
export const formatUsers = (u?: string) => (u ? `${u.replace(/k/i, ',000')} users` : '');

/** Where a product runs, from its links: "iOS, Android, Web". */
export const platforms = (p: Project) =>
  p.platforms ??
  [p.ios && 'iOS', p.android && 'Android', p.live && p.status !== 'expired' && 'Web'].filter(Boolean).join(', ');

const WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'];
/** Small numbers read better as words in running text: 6 → "six". */
export const spell = (n: number, capital = false) => {
  const w = WORDS[n] ?? String(n);
  return capital ? w[0].toUpperCase() + w.slice(1) : w;
};

/** Feature strings in the data start with an emoji; the UI shows them without. */
export const clean = (s: string) => s.replace(/^[^\p{L}\p{N}]+/u, '');

export const statusLabel: Record<Project['status'], string> = {
  live: 'Live',
  discontinued: 'Discontinued',
  expired: 'Offline',
};

export const projectLinks = (p: Project) =>
  [
    p.live && p.status !== 'expired' && { label: 'Website', href: p.live },
    p.ios && { label: 'App Store', href: p.ios },
    p.android && { label: 'Google Play', href: p.android },
    p.github && { label: 'Source', href: p.github },
  ].filter(Boolean) as { label: string; href: string }[];

/** Opens a project's detail drawer; App listens for this. */
export const OPEN_PROJECT_EVENT = 'portfolio:open-project';
export const openProject = (id: number) =>
  window.dispatchEvent(new CustomEvent(OPEN_PROJECT_EVENT, { detail: id }));

/** Opens the ⌘K menu from anywhere. */
export const COMMAND_EVENT = 'portfolio:command';
export const openCommand = () => window.dispatchEvent(new Event(COMMAND_EVENT));

/** Focuses the Ask AI box in the hero. */
export const ASK_EVENT = 'portfolio:ask';
export const focusAsk = (q?: string) => window.dispatchEvent(new CustomEvent(ASK_EVENT, { detail: q }));

export const toggleTheme = () => {
  const dark = document.documentElement.classList.toggle('dark');
  try {
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  } catch {
    /* storage blocked */
  }
};

export const scrollToHash = (hash: string) => {
  document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
  history.replaceState(null, '', hash);
};
