/**
 * Real product imagery, keyed by project id. Phone screens come from each
 * app's App Store listing or simulator captures; browser shots are captures of
 * the live sites. `tint` is the panel colour, picked from the product's own
 * branding.
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
  105: {
    icon: '/images/projects/vocavoy-icon.jpg',
    phones: ['/images/projects/vocavoy-1.jpg', '/images/projects/vocavoy-2.jpg', '/images/projects/vocavoy-3.jpg'],
    browser: { src: '/images/projects/vocavoy-web.jpg', url: 'vocavoy.com' },
    tint: '#E6F4DA',
  },
  106: {
    icon: '/images/projects/flashbae-icon.jpg',
    phones: ['/images/projects/flashbae-1.jpg', '/images/projects/flashbae-2.jpg', '/images/projects/flashbae-3.jpg'],
    browser: { src: '/images/projects/flashbae-web.jpg', url: 'flashbae.com' },
    tint: '#F6E9EC',
  },
  4: {
    icon: '/images/projects/dietly-icon.jpg',
    phones: ['/images/projects/dietly-1.jpg', '/images/projects/dietly-2.jpg', '/images/projects/dietly-3.jpg'],
    browser: { src: '/images/projects/dietly-web.jpg', url: 'dietly.life' },
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

/**
 * Order of the cards in Selected work. Everything else goes in the archive list.
 * Mobile apps and web products alternate in a checkerboard, so each row of the
 * two-column grid pairs one of each.
 */
export const SHOWCASE_IDS = [105, 100, 0, 106, 4, 103, 101, 104];
