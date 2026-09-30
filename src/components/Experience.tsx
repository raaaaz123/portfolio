import { motion } from 'framer-motion';
import { experiences } from '../data/experience';
import { education } from '../data/education';
import { personalInfo } from '../data/personalInfo';
import { FiDownload } from 'react-icons/fi';
import { ease } from '../lib/ui';
import SectionHead from './SectionHead';

const reveal = (i: number) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' } as const,
  transition: { duration: 0.6, delay: Math.min(i, 4) * 0.06, ease },
});

const Experience = () => (
  <section id="experience" className="bg-paper pb-24 pt-20 text-ink sm:pb-32 sm:pt-28">
    <div className="shell">
      <SectionHead n="07" title="Experience" />

      <div>
        {experiences.map((role, i) => (
          <motion.article
            key={role.title + role.period}
            {...reveal(i)}
            className="group grid gap-4 border-b-[1.5px] border-dashed border-ink/25 py-9 lg:grid-cols-[220px_1fr_1fr] lg:gap-10"
          >
            <div>
              <p className="text-[15px] font-semibold tabular-nums">{role.period}</p>
              {role.type && <p className="mt-1 text-[14px] text-muted-foreground">{role.type}</p>}
            </div>
            <div>
              <h3
                className="display text-[clamp(2.2rem,4vw,3.4rem)] group-hover:text-pop"
                style={{ transition: 'color .3s' }}
              >
                {role.title}
              </h3>
              <p className="mt-2 text-[16px] font-semibold">
                {role.company}
                {role.websites?.map((w) => (
                  <a
                    key={w.url}
                    href={w.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-1 inline-block px-2 py-2.5 font-medium underline decoration-pop decoration-2 underline-offset-4 hover:text-ink/70"
                  >
                    {w.name}
                  </a>
                ))}
              </p>
              {role.technologies && (
                <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
                  {role.technologies.slice(0, 7).map((t) => (
                    <li key={t} className="tag border-[1.5px] border-ink/25 text-[13px] text-ink/80">
                      {t}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <ul className="space-y-2.5">
              {role.description.slice(0, 5).map((d, k) => (
                <li key={k} className="flex gap-3 text-[16px] leading-snug text-muted-foreground">
                  <span className="mt-[0.5em] h-1.5 w-1.5 shrink-0 rounded-full bg-pop" aria-hidden="true" />
                  {d}
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>

      <div className="mt-16 grid gap-12 lg:grid-cols-2">
        <div>
          <h3 className="display text-[40px]">Education</h3>
          <dl className="mt-5">
            {education.map((e, i) => (
              <motion.div
                key={e.degree}
                {...reveal(i)}
                className="flex gap-6 border-t-[1.5px] border-ink py-4"
              >
                <dt className="w-28 shrink-0 text-[15px] font-semibold tabular-nums">{e.period}</dt>
                <dd>
                  <span className="block text-[17px] font-semibold">{e.degree}</span>
                  <span className="text-[15px] text-muted-foreground">{e.institution}</span>
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
        {/* The long version, for whoever is filling in the hiring form */}
        <motion.a
          {...reveal(1)}
          href={personalInfo.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col justify-between gap-10 rounded-[24px] border-[1.5px] border-ink bg-ink p-7 text-paper shadow-[8px_8px_0_0_hsl(var(--pop))] transition-transform duration-300 hover:-translate-y-1.5"
        >
          <span className="flex items-center justify-between text-[14px] font-semibold text-paper/70">
            PDF résumé
            <FiDownload className="text-[22px] text-pop transition-transform duration-300 group-hover:translate-y-1" aria-hidden="true" />
          </span>
          <span>
            <span className="display block text-[clamp(2.6rem,4.5vw,4rem)]">Get the résumé</span>
            <span className="mt-2 block text-[16px] text-paper/70">
              Roles, stack, education and awards.
            </span>
          </span>
        </motion.a>
      </div>
    </div>
  </section>
);

export default Experience;
