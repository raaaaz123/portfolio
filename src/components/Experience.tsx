import { experiences } from '../data/experience';
import Section from './Section';

/** "Dec 2025–Present" → "Dec 2025 to now" */
const period = (p: string) => p.replace('–Present', ' to now').replace('–', ' to ');

const Experience: React.FC = () => (
  <Section id="experience" title="Experience" intro="Over three years across contract work, client projects and my own products.">
    <ol className="divide-y divide-line overflow-hidden rounded-[28px] bg-surface">
      {experiences.map((e) => (
        <li key={`${e.company}-${e.period}`} className="grid gap-4 p-7 sm:p-10 lg:grid-cols-[16rem_1fr] lg:gap-10">
          <div>
            <p className="text-[19px] font-semibold tracking-[-0.01em]">
              {e.company === 'Self-employed' ? 'Self-employed' : e.company}
            </p>
            <p className="mt-1 text-[14px] text-muted">
              {period(e.period)}
              {e.type && `, ${e.type.replace(' · ', ', ').toLowerCase()}`}
            </p>
            {e.websites && (
              <p className="mt-3 flex flex-wrap gap-x-4 text-[14px]">
                {e.websites.map((w) => (
                  <a key={w.url} href={w.url} target="_blank" rel="noreferrer" className="a text-link">
                    {w.name}
                  </a>
                ))}
              </p>
            )}
          </div>

          <div className="max-w-[44rem]">
            <h3 className="text-[19px] font-semibold tracking-[-0.01em]">{e.title}</h3>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-ink/85 marker:text-muted">
              {e.description.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
            {e.technologies && (
              <div className="mt-5 flex flex-wrap gap-1.5">
                {e.technologies.slice(0, 9).map((t) => (
                  <span key={t} className="rounded-full bg-canvas px-2.5 py-1 text-[13px] text-ink/75">
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>
        </li>
      ))}
    </ol>
  </Section>
);

export default Experience;
