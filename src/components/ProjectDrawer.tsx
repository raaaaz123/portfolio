import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import type { Project } from '../data/projects';
import { caseStudies } from '../data/caseStudies';
import { clean, formatUsers, projectLinks } from '../lib/ui';

const ease = [0.22, 1, 0.36, 1] as const;

const H: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="mb-3 mt-10 text-[19px] font-semibold tracking-[-0.01em]">{children}</h3>
);

const statusLine = (p: Project) =>
  [
    p.year,
    p.status === 'live' ? 'Live' : p.status === 'expired' ? 'Offline now' : 'Discontinued',
    p.users && `about ${formatUsers(p.users)}`,
    p.role,
  ]
    .filter(Boolean)
    .join(', ');

/** Full details for one project, slid in from the right. */
const ProjectDrawer: React.FC<{ project: Project | null; onClose: () => void }> = ({ project, onClose }) => {
  const panel = useRef<HTMLDivElement>(null);
  const cs = project && caseStudies.find((c) => c.projectId === project.id);

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
            className="absolute inset-y-0 right-0 flex w-full max-w-[620px] flex-col border-l border-line bg-surface outline-none"
          >
            <div className="flex-1 overflow-y-auto overscroll-contain px-6 pb-20 pt-6 sm:px-10">
              <div className="flex items-start justify-between gap-6">
                <h2 className="pt-4 text-[34px] font-semibold leading-tight tracking-[-0.025em]">{project.title}</h2>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close"
                  className="-mr-2 grid h-10 w-10 shrink-0 place-items-center text-muted hover:text-ink"
                >
                  <FiX className="h-5 w-5" />
                </button>
              </div>
              <p className="mt-2 text-[14px] text-muted">{statusLine(project)}</p>

              {projectLinks(project).length > 0 && (
                <p className="mt-4 flex flex-wrap gap-x-5 gap-y-1">
                  {projectLinks(project).map((l) => (
                    <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="a text-link">
                      {l.label}
                    </a>
                  ))}
                </p>
              )}

              <p className="mt-8 text-[18px] leading-relaxed">{cs ? cs.problem : project.description}</p>

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
              <p className="text-muted">{project.tags.join(', ')}.</p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProjectDrawer;
