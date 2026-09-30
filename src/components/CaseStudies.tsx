import { Fragment } from 'react';
import { motion } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';
import { caseStudies, type CaseStudy, type FlowStep } from '../data/caseStudies';
import { projects } from '../data/projects';
import { breakable, ease } from '../lib/ui';
import SectionHead from './SectionHead';

const reveal = (i = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' } as const,
  transition: { duration: 0.6, delay: i * 0.08, ease },
});

/** Architecture as boxes and arrows: a row on desktop, a column on phones. */
const Flow: React.FC<{ steps: FlowStep[]; host: string }> = ({ steps, host }) => (
  <figure className="rounded-[20px] border-[1.5px] border-ink bg-ink p-5 text-paper sm:p-6">
    <figcaption className="mb-5 flex flex-wrap items-center justify-between gap-2 text-[13px] font-semibold text-paper/60">
      <span>Architecture</span>
      <span>{host}</span>
    </figcaption>
    <ol className="flex flex-col items-stretch gap-2 lg:flex-row lg:items-center">
      {steps.map((s, i) => (
        <Fragment key={s.label}>
          <motion.li
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.12, ease }}
            className="min-w-0 flex-1 rounded-xl border-[1.5px] border-paper/20 p-3"
          >
            <p className="text-[13px] font-bold text-pop">{s.label}</p>
            {s.items ? (
              <ul className="mt-2 space-y-1">
                {s.items.map((it) => (
                  <li key={it} className="rounded-md bg-paper/10 px-2 py-1 text-[13px] font-medium">
                    {it}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-1 text-[13px] text-paper/70">{s.note}</p>
            )}
          </motion.li>
          {i < steps.length - 1 && (
            <motion.span
              aria-hidden="true"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 + 0.2 }}
              className="self-center text-[18px] font-bold text-pop lg:px-0.5"
            >
              <span className="hidden lg:inline">→</span>
              <span className="lg:hidden">↓</span>
            </motion.span>
          )}
        </Fragment>
      ))}
    </ol>
  </figure>
);

const Study: React.FC<{ c: CaseStudy; n: number }> = ({ c, n }) => {
  const project = projects.find((p) => p.id === c.projectId);
  const href = project?.live;

  return (
    <article className="border-t-[1.5px] border-ink py-12 sm:py-16">
      <motion.header {...reveal()} className="flex flex-wrap items-end justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[14px] font-semibold text-muted-foreground">
            Case study {n}: {c.kicker}
          </p>
          <h3 className="display mt-2 text-[clamp(2.8rem,7vw,6rem)]">{breakable(c.title)}</h3>
        </div>
        {href && (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="pill gap-2 border-[1.5px] border-ink px-5 py-2.5 text-[15px] hover:bg-ink hover:text-paper"
          >
            Visit live product <FiArrowUpRight aria-hidden="true" />
          </a>
        )}
      </motion.header>

      <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:gap-12">
        <motion.div {...reveal(1)}>
          <h4 className="text-[15px] font-bold">The problem</h4>
          <p className="mt-2 max-w-[55ch] text-[17px] leading-relaxed">{c.problem}</p>
        </motion.div>
        <motion.div {...reveal(2)}>
          <h4 className="text-[15px] font-bold">What I built</h4>
          <ul className="mt-2 space-y-2">
            {c.built.map((b) => (
              <li key={b} className="flex gap-3 text-[16px] leading-snug text-ink/85">
                <span className="mt-[0.5em] h-1.5 w-1.5 shrink-0 rounded-full bg-ink" aria-hidden="true" />
                {b}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      <motion.div {...reveal(1)} className="mt-10">
        <Flow steps={c.flow} host={c.host} />
      </motion.div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
        <motion.div {...reveal(1)}>
          <h4 className="text-[15px] font-bold">Key decisions</h4>
          <dl className="mt-3 space-y-4">
            {c.decisions.map((d) => (
              <div key={d.what} className="rounded-2xl border-[1.5px] border-ink/20 p-4">
                <dt className="text-[16px] font-bold">{d.what}</dt>
                <dd className="mt-1 text-[15px] leading-snug text-muted-foreground">Why: {d.why}</dd>
              </div>
            ))}
          </dl>
        </motion.div>
        <motion.div {...reveal(2)}>
          <h4 className="text-[15px] font-bold">Results</h4>
          <ul className="mt-3 grid grid-cols-3 gap-2 lg:grid-cols-1">
            {c.results.map((r) => (
              <li key={r.label} className="rounded-2xl border-[1.5px] border-ink bg-pop p-3 lg:flex lg:items-baseline lg:gap-3 lg:p-4">
                <span className="display block text-[36px] leading-none lg:text-[44px]">{r.value}</span>
                <span className="mt-1 block text-[13px] font-semibold leading-snug lg:mt-0 lg:text-[15px]">{r.label}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </article>
  );
};

const CaseStudies = () => (
  <section id="case-studies" className="bg-paper pb-12 pt-20 text-ink sm:pt-28">
    <div className="shell">
      <SectionHead n="02" title="Case studies" />
      <div className="mt-10">
        {caseStudies.map((c, i) => (
          <Study key={c.projectId} c={c} n={i + 1} />
        ))}
      </div>
    </div>
  </section>
);

export default CaseStudies;
