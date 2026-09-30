import { useLayoutEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { projects, type Project } from '../data/projects';
import { breakable, ease, openProject } from '../lib/ui';
import SectionHead from './SectionHead';
import { Tilt } from './fx';

const palettes = [
  { bg: 'bg-pop', fg: 'text-ink', sub: 'text-ink/70', rule: 'text-ink/50' },
  { bg: 'bg-mint', fg: 'text-ink', sub: 'text-ink/70', rule: 'text-ink/50' },
  { bg: 'bg-sun', fg: 'text-ink', sub: 'text-ink/70', rule: 'text-ink/50' },
  { bg: 'bg-moss', fg: 'text-paper', sub: 'text-paper/80', rule: 'text-paper/50' },
  { bg: 'bg-ink', fg: 'text-paper', sub: 'text-paper/65', rule: 'text-paper/40' },
];

const statusMeta = {
  live: { label: 'Live', dot: 'bg-[#22C55E]' },
  expired: { label: 'Domain expired', dot: 'bg-current opacity-40' },
  discontinued: { label: 'Retired', dot: 'border-[1.5px] border-current' },
} as const;

const Card: React.FC<{ project: Project; i: number }> = ({ project, i }) => {
  const c = palettes[i % palettes.length];
  return (
    <Tilt className="w-[82vw] max-w-[420px] shrink-0 snap-start sm:w-[420px]" max={9}>
    <button
      type="button"
      onClick={() => openProject(project.id)}
      className={`group flex h-[440px] w-full flex-col rounded-[22px] border-[1.5px] border-ink p-7 text-left transition-shadow duration-300 hover:shadow-[8px_8px_0_0_hsl(var(--ink))] sm:h-[480px] ${c.bg} ${c.fg}`}
      aria-label={`${project.title}: ${project.summary} Open details`}
    >
      <span className={`flex items-center justify-between text-[13px] font-semibold ${c.sub}`}>
        <span>
          {project.year} — {project.role}
        </span>
        <span className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${statusMeta[project.status].dot}`} aria-hidden="true" />
          {statusMeta[project.status].label}
        </span>
      </span>

      <span
        className="display mt-auto text-[clamp(2.8rem,5.2vw,4.6rem)] group-hover:[--wdth:88]"
        style={{ transition: '--wdth 0.6s cubic-bezier(0.22,1,0.36,1)' }}
      >
        {breakable(project.title)}
      </span>
      <span className={`mt-4 max-w-[34ch] text-[16px] leading-snug ${c.sub}`}>{project.summary}</span>

      <span className={`rule-dash mt-7 ${c.rule}`} />
      <span className="mt-4 flex items-center justify-between text-[13px] font-semibold">
        <span>{project.users ? `${project.users} users` : 'New release'}</span>
        <span className="flex h-9 w-9 items-center justify-center rounded-full border-[1.5px] border-current text-lg transition-transform duration-500 group-hover:rotate-90">
          +
        </span>
      </span>
    </button>
    </Tilt>
  );
};

const Projects = () => {
  const still = !!useReducedMotion();
  const pin = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [wide, setWide] = useState(false);

  // How far the track must travel sideways; also sets how tall the pin runs.
  useLayoutEffect(() => {
    const measure = () => {
      const isWide = window.innerWidth >= 900 && !still;
      setWide(isWide);
      if (track.current) setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [still, wide]);

  const { scrollYProgress } = useScroll({ target: pin, offset: ['start start', 'end end'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  const x = useTransform(smooth, [0, 1], [0, -distance]);
  const bar = useTransform(smooth, [0, 1], ['0%', '100%']);

  const cards = projects.map((p, i) => <Card key={p.id} project={p} i={i} />);

  return (
    <section id="work" className="bg-paper pt-20 text-ink sm:pt-28">
      <div className="shell">
        <SectionHead n="04" title="Selected work" note={wide ? 'Scroll to move sideways' : 'Swipe sideways'} />
      </div>

      {wide ? (
        <div ref={pin} style={{ height: `calc(100vh + ${distance}px)` }} className="relative">
          <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-20">
            <motion.div ref={track} style={{ x }} className="flex w-max gap-6 px-12">
              {cards}
            </motion.div>
            <div className="shell mt-10 flex items-center gap-5">
              <div className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-ink/10">
                <motion.div style={{ width: bar }} className="absolute inset-y-0 left-0 bg-ink" />
              </div>
              <span className="text-[14px] font-semibold tabular-nums">
                {projects.length} products
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div
          ref={track}
          className="flex snap-x snap-mandatory scroll-pl-4 gap-4 overflow-x-auto px-4 pb-20 pt-10 sm:scroll-pl-8 sm:px-8 [scrollbar-width:none]"
        >
          {cards}
        </div>
      )}
    </section>
  );
};

export default Projects;

/** Full details for one project, opened from a card or the hero readout. */
export const ProjectSheet: React.FC<{ project: Project | null; onClose: () => void }> = ({
  project,
  onClose,
}) => {
  const clean = (s: string) => s.replace(/^[^\w\s]+\s*/, '');
  const links = (p: Project) =>
    [
      p.live && p.status !== 'expired' && { label: 'Visit site', href: p.live },
      p.ios && { label: 'App Store', href: p.ios },
      p.android && { label: 'Google Play', href: p.android },
      p.github && { label: 'Source', href: p.github },
    ].filter(Boolean) as { label: string; href: string }[];

  if (!project) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] flex items-end justify-center bg-ink/60 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="sheet-title"
        initial={{ y: 60, opacity: 0, rotate: -1 }}
        animate={{ y: 0, opacity: 1, rotate: 0 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.5, ease }}
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent
        className="max-h-[88svh] w-full max-w-3xl overflow-y-auto rounded-t-[22px] border-[1.5px] border-ink bg-paper p-6 text-ink shadow-[8px_8px_0_0_hsl(var(--ink))] sm:rounded-[22px] sm:p-10"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[14px] font-semibold text-muted-foreground">
              {project.year} — {project.role}
              {project.users && `, ${project.users} users`}
            </p>
            <h3 id="sheet-title" className="display mt-2 text-[clamp(2.6rem,8vw,5.5rem)]">
              {breakable(project.title)}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            autoFocus
            className="pill shrink-0 border-[1.5px] border-ink px-4 py-2 text-[14px]"
          >
            Close
          </button>
        </div>

        <p className="mt-6 text-lg leading-relaxed">{project.description}</p>

        {project.features && (
          <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
            {project.features.slice(0, 6).map((f, i) => (
              <li key={i} className="flex gap-3 text-[15px] leading-snug text-muted-foreground">
                <span className="mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full bg-pop" aria-hidden="true" />
                {clean(f)}
              </li>
            ))}
          </ul>
        )}

        <ul className="mt-7 flex flex-wrap gap-2" aria-label="Built with">
          {project.tags.map((t) => (
            <li key={t} className="tag border-[1.5px] border-ink/30 text-ink/80">
              {t}
            </li>
          ))}
        </ul>

        {links(project).length > 0 && (
          <div className="mt-8 flex flex-wrap gap-3 border-t-[1.5px] border-dashed border-ink/25 pt-6">
            {links(project).map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="pill border-[1.5px] border-ink bg-pop px-5 py-2.5 text-ink"
              >
                <span className="pill-roll">
                  <span>{l.label}</span>
                  <span aria-hidden="true">{l.label}</span>
                </span>
              </a>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};
