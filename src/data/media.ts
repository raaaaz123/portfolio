/**
 * Real product imagery, keyed by project id. Phone screens come from each
 * app's App Store listing; browser shots are captures of the live sites.
 * `tint` is the panel colour, picked from the product's own branding.
 */
export interface ProjectMedia {
  icon?: string;
  phones?: string[];
  browser?: { src: string; url: string };
  tint: string;
  /** Dark panels flip the text colour. */
  dark?: boolean;
}

export const media: Record<number, ProjectMedia> = {
  4: {
    icon: '/images/projects/dietly-icon.jpg',
    phones: ['/images/projects/dietly-1.jpg', '/images/projects/dietly-2.jpg', '/images/projects/dietly-3.jpg'],
    tint: '#0B0C0B',
    dark: true,
  },
  104: {
    icon: '/images/projects/glowzen-icon.jpg',
    phones: ['/images/projects/glowzen-1.jpg', '/images/projects/glowzen-2.jpg', '/images/projects/glowzen-3.jpg'],
    tint: '#E8E1FB',
  },
  101: {
    icon: '/images/projects/notes-icon.jpg',
    phones: ['/images/projects/notes-1.jpg', '/images/projects/notes-2.jpg', '/images/projects/notes-3.jpg'],
    tint: '#ECEDEF',
  },
  100: {
    browser: { src: '/images/projects/chatlo-web.jpg', url: 'chatlo.io' },
    tint: '#F4ECE2',
  },
  103: {
    browser: { src: '/images/projects/clawinst-web.jpg', url: 'clawinst.com' },
    tint: '#0E0C15',
    dark: true,
  },
  0: {
    browser: { src: '/images/projects/rexapilot-web.jpg', url: 'rexapilot.com' },
    tint: '#E6EDFB',
  },
};

/** Order of the large panels in Selected work. */
export const SHOWCASE_IDS = [4, 103, 100, 104, 101, 0];
