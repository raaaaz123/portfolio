import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, type Project } from '../data/projects';
import Section from './Section';
import { ease } from '../lib/ui';
import usePointerGlow from '../hooks/usePointerGlow';

/** Strips the leading emoji the feature strings were authored with. */
const clean = (s: string) => s.replace(/^[^\w\s]+\s*/, '');

const statusMeta = {
  live: { label: 'Live', dot: 'bg-primary' },
  expired: { label: 'Domain expired', dot: 'bg-muted-foreground/40' },
  discontinued: { label: 'Discontinued', dot: 'border border-muted-foreground/50' },
} as const;

const StatusTag: React.FC<{ status: Project['status'] }> = ({ status }) => {
  const { label, dot } = statusMeta[status];
  return (
    <span className="label flex shrink-0 items-center gap-1.5">
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} aria-hidden="true" />
      {label}
    </span>
  );
};

// An expired domain means the live URL is dead, so it is not offered as a link.
const links = (p: Project) =>
  [
    p.live && p.status !== 'expired' && { label: 'Live', href: p.live },
    p.ios && { label: 'iOS', href: p.ios },
    p.android && { label: 'Android', href: p.android },
    p.github && { label: 'Source', href: p.github },
  ].filter(Boolean) as { label: string; href: string }[];

const Row: React.FC<{ project: Project; n: number; open: boolean; onToggle: () => void }> = ({
  project,
  n,
  open,
  onToggle,
}) => {
  const glow = usePointerGlow();

  return (
  <motion.li
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-30px' }}
    transition={{ duration: 0.45, delay: Math.min(n, 6) * 0.04, ease }}
    className="spotlight relative rounded-lg border-b border-hairline last:border-b-0"
    onPointerMove={glow}
  >
    <button
      onClick={onToggle}
      aria-expanded={open}
      className="group relative flex w-full items-baseline gap-3 px-1.5 py-4 text-left transition-[padding] duration-500 hover:px-2.5 sm:gap-6 sm:px-2 sm:py-5"
    >
      <span
        className={`label shrink-0 tabular-nums transition-colors ${
          open ? 'text-primary' : 'group-hover:text-primary'
        }`}
      >
        {String(n + 1).padStart(2, '0')}
      </span>

      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
          <span
            className={`font-display text-lg font-normal tracking-tight transition-colors sm:text-2xl ${
              open ? 'text-primary' : 'text-foreground group-hover:text-primary'
            }`}
          >
            {project.title}
          </span>
          {project.role && <span className="label hidden sm:inline">{project.role}</span>}
          <StatusTag status={project.status} />
          {project.users && (
            <span className="label shrink-0 tabular-nums">{project.users} users</span>
          )}
        </span>
        <span className="mt-1.5 block text-[12px] leading-relaxed text-muted-foreground sm:text-[12.5px]">
          {project.summary}
        </span>
      </span>

      <span className="label shrink-0 tabular-nums">{project.year}</span>
      <span
        className={`shrink-0 text-muted-foreground transition-transform duration-300 ${
          open ? 'rotate-45 text-primary' : 'group-hover:text-foreground'
        }`}
        aria-hidden="true"
      >
        +
      </span>
    </button>

    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease }}
          className="overflow-hidden"
        >
          <div className="pb-7 pl-1.5 pr-1.5 pt-1 sm:pb-8 sm:pl-[calc(2ch+2rem)] sm:pr-2">
            <div className="glass-panel max-w-[64ch] space-y-5 rounded-xl p-4 sm:space-y-6 sm:p-6">
              <p className="text-[13px] leading-relaxed text-muted-foreground">
                {project.description}
              </p>

              {project.features && (
                <ul className="space-y-1.5">
                  {project.features.slice(0, 4).map((f, i) => (
                    <li key={i} className="flex gap-3 text-[12.5px] leading-relaxed text-muted-foreground">
                      <span className="select-none text-primary/70">—</span>
                      <span>{clean(f)}</span>
                    </li>
                  ))}
                </ul>
              )}

              <p className="text-[11.5px] leading-relaxed text-muted-foreground/80">
                {project.tags.slice(0, 8).join(' · ')}
              </p>

              <div className="flex flex-wrap gap-x-5 gap-y-2">
                {links(project).map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="label link-underline text-primary hover:text-primary"
                  >
                    {l.label} ↗
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.li>
  );
};

const Projects = () => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <Section id="work" index="02" path="shipped">
      <ul className="border-t border-hairline">
        {projects.map((p, i) => (
          <Row
            key={p.id}
            project={p}
            n={i}
            open={open === p.id}
            onToggle={() => setOpen(open === p.id ? null : p.id)}
          />
        ))}
      </ul>
    </Section>
  );
};

export default Projects;
