import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiArrowUpRight, FiX } from 'react-icons/fi';
import type { Project } from '../data/projects';
import { caseStudies } from '../data/caseStudies';
import { media } from '../data/media';
import { clean, formatUsers, platforms, projectLinks } from '../lib/ui';
import { Browser } from './Shots';
import { StatusDot } from './Work';

const ease = [0.22, 1, 0.36, 1] as const;

const H: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="mb-3 mt-10 text-[19px] font-semibold tracking-[-0.01em]">{children}</h3>
);

const facts = (p: Project) =>
  [
    ['Role', p.role ?? 'Solo build'],
    ['Platforms', platforms(p) || 'n/a'],
    ['Year', String(p.year)],
    ['Users', p.users ? formatUsers(p.users).replace(' users', '') : 'New launch'],
  ];

/** Full details for one project, slid in from the right. */
const ProjectDrawer: React.FC<{ project: Project | null; onClose: () => void }> = ({ project, onClose }) => {
  const panel = useRef<HTMLDivElement>(null);
  const cs = project && caseStudies.find((c) => c.projectId === project.id);
  const m = project ? media[project.id] : undefined;

  useEffect(() => {
    if (!project) return;
    const restore = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    const t = setTimeout(() => panel.current?.focus(), 50);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      clearTimeout(t);
      restore?.focus?.();
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-50">
          <motion.div
            className="absolute inset-0 bg-ink/25"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
            tabIndex={-1}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease }}
            className="absolute inset-y-0 right-0 flex w-full max-w-[680px] flex-col border-l border-line bg-surface outline-none"
          >
            <div className="flex-1 overflow-y-auto overscroll-contain px-6 pb-20 pt-6 sm:px-10">
              <div className="flex items-start justify-between gap-6">
                <div className="flex items-center gap-4 pt-2">
                  {m?.icon && <img src={m.icon} alt="" className="h-14 w-14 rounded-[14px] border border-line" />}
                  <div>
                    <h2 className="text-[30px] font-semibold leading-tight tracking-[-0.025em]">{project.title}</h2>
                    <StatusDot p={project} className="text-[13px] text-muted" />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close"
                  className="-mr-2 grid h-10 w-10 shrink-0 place-items-center rounded-full text-muted hover:bg-canvas hover:text-ink"
                >
                  <FiX className="h-5 w-5" />
                </button>
              </div>

              <p className="mt-4 text-[16px] leading-relaxed text-ink/80">{project.summary}</p>

              {projectLinks(project).length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {projectLinks(project).map((l, i) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      className={i === 0 ? 'btn-ink' : 'btn-line'}
                    >
                      {l.label}
                      <FiArrowUpRight className="h-3.5 w-3.5 opacity-70" />
                    </a>
                  ))}
                </div>
              )}

              {m && (m.phones || m.browser) && (
                <div
                  style={{ backgroundColor: m.tint }}
                  className="-mx-6 mt-8 flex snap-x gap-4 overflow-x-auto px-6 py-6 sm:mx-0 sm:rounded-2xl"
                >
                  {m.browser && (
                    <div className="w-[440px] max-w-[85%] shrink-0 snap-start self-center">
                      <Browser shot={m.browser} dark={m.dark} title={project.title} />
                    </div>
                  )}
                  {m.phones?.map((src, i) => (
                    <div key={src} className="phone h-[340px] w-[157px] shrink-0 snap-start">
                      <img src={src} alt={`${project.title} screen ${i + 1}`} loading="lazy" />
                    </div>
                  ))}
                </div>
              )}

              <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 rounded-2xl border border-line p-5 sm:grid-cols-4">
                {facts(project).map(([k, v]) => (
                  <div key={k}>
                    <dt className="mb-0.5 text-[12.5px] text-muted">{k}</dt>
                    <dd className="text-[14.5px] font-medium leading-snug">{v}</dd>
                  </div>
                ))}
              </dl>

              <p className="mt-8 text-[17px] leading-relaxed">{cs ? cs.problem : project.description}</p>

              {cs && (
                <>
                  <H>How it works</H>
                  <ol className="list-decimal space-y-1.5 pl-5 marker:text-muted">
                    {cs.flow.map((step) => (
                      <li key={step.label}>
                        <span className="font-medium">{step.label}</span>
                        <span className="text-muted">
                          {step.items ? `: ${step.items.join(', ')}` : step.note ? `: ${step.note}` : ''}
                        </span>
                      </li>
                    ))}
                  </ol>
                  <p className="mt-3 text-[14px] text-muted">Runs on {cs.host}.</p>

                  <H>What I built</H>
                  <ul className="list-disc space-y-1.5 pl-5 marker:text-muted">
                    {cs.built.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>

                  <H>Decisions worth explaining</H>
                  <div className="space-y-5">
                    {cs.decisions.map((d) => (
                      <div key={d.what}>
                        <p className="font-semibold">{d.what}.</p>
                        <p className="mt-0.5 text-muted">{d.why[0].toUpperCase() + d.why.slice(1)}</p>
                      </div>
                    ))}
                  </div>

                  <H>Where it is now</H>
                  <ul className="list-disc space-y-1 pl-5 marker:text-muted">
                    {cs.results.map((r) => (
                      <li key={r.label}>
                        <span className="font-semibold">{r.value}</span> {r.label}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {!cs && project.features && (
                <>
                  <H>What it does</H>
                  <ul className="list-disc space-y-1.5 pl-5 marker:text-muted">
                    {project.features.map((f) => (
                      <li key={f}>{clean(f)}</li>
                    ))}
                  </ul>
                </>
              )}

              <H>Built with</H>
              <ul className="flex flex-wrap gap-1.5">
                {project.tags.map((t) => (
                  <li key={t} className="rounded-md bg-canvas px-2.5 py-1 text-[13.5px] text-ink/80">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProjectDrawer;
