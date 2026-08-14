import { motion } from 'framer-motion';
import { experiences } from '../data/experience';
import { education } from '../data/education';
import { achievements } from '../data/achievements';
import Section from './Section';
import { ease } from '../lib/ui';

const item = (i: number) => ({
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' } as const,
  transition: { duration: 0.45, delay: Math.min(i, 5) * 0.05, ease },
});

/* ─── A role ─── */
const Role: React.FC<{ role: (typeof experiences)[0]; i: number }> = ({ role, i }) => (
  <motion.article {...item(i)} className="relative pb-9 pl-5 last:pb-0 sm:pb-10 sm:pl-8">
    {/* hairline spine + node */}
    <span className="absolute left-0 top-2 h-full w-px bg-hairline" aria-hidden="true" />
    <span
      className={`absolute -left-[3px] top-1.5 h-[7px] w-[7px] rounded-full ${
        i === 0 ? 'bg-primary' : 'bg-hairline ring-2 ring-background'
      }`}
      aria-hidden="true"
    />

    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
      <h3 className="font-display text-lg font-normal text-foreground sm:text-xl">{role.title}</h3>
      <span className="label tabular-nums sm:ml-auto">{role.period}</span>
    </div>

    <p className="mt-1 text-[12.5px] text-muted-foreground">
      {role.company}
      {role.type && <span className="text-muted-foreground/60"> · {role.type}</span>}
    </p>

    <ul className="mt-4 space-y-1.5">
      {role.description.slice(0, 3).map((d, k) => (
        <li key={k} className="flex gap-3 text-[12.5px] leading-relaxed text-muted-foreground">
          <span className="select-none text-primary/70">—</span>
          <span>{d}</span>
        </li>
      ))}
    </ul>

    {role.technologies && (
      <p className="mt-4 text-[11.5px] leading-relaxed text-muted-foreground/80">
        {role.technologies.slice(0, 8).join(' · ')}
      </p>
    )}

    {role.websites && role.websites.length > 0 && (
      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1">
        {role.websites.map((w) => (
          <a
            key={w.url}
            href={w.url}
            target="_blank"
            rel="noopener noreferrer"
            className="label link-underline text-primary hover:text-primary"
          >
            {w.name} ↗
          </a>
        ))}
      </div>
    )}
  </motion.article>
);

/* ─── Small sub-block heading ─── */
const SubHeading: React.FC<{ children: string }> = ({ children }) => (
  <div className="mb-5 flex items-center gap-4">
    <span className="label text-foreground">{children}</span>
    <span className="rule flex-1" />
  </div>
);

const Experience = () => (
  <Section id="experience" index="03" path="experience">
    <div>
      {experiences.map((role, i) => (
        <Role key={role.title} role={role} i={i} />
      ))}
    </div>

    {/* Education — two lines, no cards */}
    <div className="mt-11 sm:mt-12">
      <SubHeading>Education</SubHeading>
      <dl className="space-y-4">
        {education.map((e, i) => (
          <motion.div
            key={e.degree}
            {...item(i)}
            className="flex flex-col gap-x-6 gap-y-1 sm:flex-row sm:items-baseline"
          >
            <dt className="label shrink-0 tabular-nums sm:w-28">{e.period}</dt>
            <dd className="min-w-0">
              <span className="text-[13px] text-foreground">{e.degree}</span>
              <span className="block text-[12px] text-muted-foreground">{e.institution}</span>
            </dd>
          </motion.div>
        ))}
      </dl>
    </div>

    {/* Recognition — one line each */}
    <div className="mt-10 sm:mt-12">
      <SubHeading>Recognition</SubHeading>
      <dl className="space-y-4">
        {achievements.map((a, i) => (
          <motion.div
            key={a.id}
            {...item(i)}
            className="flex flex-col gap-x-6 gap-y-1 sm:flex-row sm:items-baseline"
          >
            <dt className="label shrink-0 tabular-nums sm:w-28">{a.year}</dt>
            <dd className="min-w-0">
              <span className="text-[13px] text-foreground">
                {a.prize.split('–')[0].trim()} — {a.eventName}
              </span>
              <span className="block text-[12px] text-muted-foreground">
                {a.projectName} · {a.location}
              </span>
            </dd>
          </motion.div>
        ))}
      </dl>
    </div>
  </Section>
);

export default Experience;
