import { motion } from 'framer-motion';
import { SiAppstore, SiGoogleplay } from 'react-icons/si';
import { FiGlobe, FiArrowUpRight } from 'react-icons/fi';
import { projects, type Project } from '../data/projects';
import { breakable, ease, FLAGSHIP_IDS, openProject } from '../lib/ui';
import useAnalytics from '../hooks/usePostHog';
import SectionHead from './SectionHead';
import { Tilt } from './fx';

const flagships = FLAGSHIP_IDS.map((id) => projects.find((p) => p.id === id)).filter(
  Boolean,
) as Project[];

const skins = [
  { bg: 'bg-pop', text: 'text-ink', sub: 'text-ink/70', btn: 'bg-ink text-paper hover:bg-paper hover:text-ink', ghost: 'border-ink/40 text-ink hover:bg-ink hover:text-paper' },
  { bg: 'bg-mint', text: 'text-ink', sub: 'text-ink/70', btn: 'bg-ink text-paper hover:bg-paper hover:text-ink', ghost: 'border-ink/40 text-ink hover:bg-ink hover:text-paper' },
  { bg: 'bg-sun', text: 'text-ink', sub: 'text-ink/70', btn: 'bg-ink text-paper hover:bg-paper hover:text-ink', ghost: 'border-ink/40 text-ink hover:bg-ink hover:text-paper' },
  { bg: 'bg-paper', text: 'text-ink', sub: 'text-ink/70', btn: 'bg-ink text-paper hover:bg-pop hover:text-ink', ghost: 'border-ink/40 text-ink hover:bg-ink hover:text-paper' },
];

const linksOf = (p: Project) =>
  [
    p.ios && { label: 'App Store', href: p.ios, Icon: SiAppstore },
    p.android && { label: 'Google Play', href: p.android, Icon: SiGoogleplay },
    p.live && p.status !== 'expired' && { label: 'Website', href: p.live, Icon: FiGlobe },
  ].filter(Boolean) as { label: string; href: string; Icon: typeof FiGlobe }[];

const platforms = (p: Project) =>
  [p.live && 'Web', p.ios && 'iOS', p.android && 'Android'].filter(Boolean).join(' + ');

const Card: React.FC<{ p: Project; i: number }> = ({ p, i }) => {
  const s = skins[i % skins.length];
  const { trackEvent } = useAnalytics();

  return (
    <motion.div
      className="min-w-0"
      initial={{ opacity: 0, y: 60, rotate: i % 2 ? 2 : -2 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, delay: (i % 2) * 0.12, ease }}
    >
      <Tilt className="h-full" max={7}>
        <article
          className={`relative flex h-full min-h-[440px] flex-col overflow-hidden rounded-[28px] border-[1.5px] border-ink p-6 shadow-[10px_10px_0_0_hsl(var(--pop)/0.9)] sm:min-h-[460px] sm:p-9 ${s.bg} ${s.text}`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Oversized initial, floating behind the content */}
          <span
            aria-hidden="true"
            className="display pointer-events-none absolute -right-6 -top-10 text-[260px] leading-none opacity-[0.09] [transform:translateZ(20px)]"
          >
            {p.title[0]}
          </span>

          <div className={`flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] font-semibold ${s.sub} [transform:translateZ(30px)]`}>
            <span className="flex items-center gap-2 rounded-full bg-ink px-2.5 py-1 text-paper">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pop opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-pop" />
              </span>
              Live
            </span>
            <span>{p.year}</span>
            <span>{p.role}</span>
            <span>{platforms(p)}</span>
          </div>

          <h3 className="display mt-auto pt-16 text-[clamp(2.8rem,6vw,5.6rem)] [transform:translateZ(60px)]">
            {breakable(p.title)}
          </h3>
          <p className={`mt-3 max-w-[40ch] text-[17px] leading-snug ${s.sub} [transform:translateZ(40px)]`}>
            {p.summary}
          </p>

          <div className="mt-6 flex flex-wrap items-end justify-between gap-4 [transform:translateZ(50px)]">
            <div className="flex flex-wrap gap-2">
              {linksOf(p).map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('project_link_click', { project: p.title, link: label, from: 'flagship' })}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[14px] font-semibold transition-colors ${s.btn}`}
                >
                  <Icon aria-hidden="true" />
                  {label}
                </a>
              ))}
              <button
                type="button"
                onClick={() => openProject(p.id)}
                className={`inline-flex items-center gap-1.5 rounded-full border-[1.5px] px-4 py-2 text-[14px] font-semibold transition-colors ${s.ghost}`}
              >
                Details <FiArrowUpRight aria-hidden="true" />
              </button>
            </div>
            {p.users && (
              <p className="text-right">
                <span className="display block text-[56px] leading-[0.8]">{p.users}</span>
                <span className={`text-[13px] font-semibold ${s.sub}`}>users</span>
              </p>
            )}
          </div>
        </article>
      </Tilt>
    </motion.div>
  );
};

const Featured = () => (
  <section id="products" className="grain relative overflow-hidden bg-ink pb-24 pt-20 text-paper sm:pb-32 sm:pt-28">
    <div
      aria-hidden="true"
      className="pointer-events-none absolute right-[-10%] top-[10%] h-[70vmin] w-[70vmin] rounded-full bg-pop/10 blur-[140px]"
    />
    <div className="shell relative">
      <SectionHead n="01" title="Live products" tone="paper" />
      <div className="mt-14 grid gap-8 lg:grid-cols-2 lg:gap-10">
        {flagships.map((p, i) => (
          <Card key={p.id} p={p} i={i} />
        ))}
      </div>
    </div>
  </section>
);

export default Featured;
