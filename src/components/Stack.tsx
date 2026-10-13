import { skillGroups } from '../data/skills';
import Section from './Section';

const Stack: React.FC = () => (
  <Section id="stack" title="Stack" intro="What I reach for first. Not a list of everything I’ve touched.">
    <div className="grid gap-4 sm:grid-cols-2">
      {skillGroups.map((g) => (
        <div key={g.label} className="rounded-2xl border border-line bg-surface p-6 sm:p-7">
          <h3 className="text-[17px] font-semibold">{g.label.replace('&', 'and')}</h3>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {g.items.map((s) => (
              <span key={s} className="rounded-full bg-canvas px-3 py-1.5 text-[14px] text-ink/80">
                {s}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </Section>
);

export default Stack;
