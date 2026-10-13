import { achievements } from '../data/achievements';
import { education } from '../data/education';
import Section from './Section';

/** "2nd Place – National Level Hackathon" → "2nd place" */
const place = (prize: string) => prize.split('–')[0].trim().replace('Place', 'place');

const Awards: React.FC = () => (
  <Section id="awards" title="Awards and education">
    <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
      <ul className="divide-y divide-line rounded-[28px] bg-surface px-7 sm:px-10">
        {achievements.map((a) => (
          <li key={a.id} className="grid grid-cols-[1fr_auto] gap-4 py-6">
            <div>
              <p className="font-semibold">{a.projectName}</p>
              <p className="mt-0.5 text-[15px] text-muted">
                {a.eventName}, {a.location}, {a.year}
              </p>
            </div>
            <p className="self-start rounded-full bg-canvas px-3 py-1 text-[13px] font-medium">{place(a.prize)}</p>
          </li>
        ))}
      </ul>

      <ul className="divide-y divide-line rounded-[28px] bg-surface px-7 sm:px-10">
        {education.map((e) => (
          <li key={e.degree} className="py-6">
            <p className="font-semibold">{e.degree}</p>
            <p className="mt-0.5 text-[15px] text-muted">
              {e.institution}, {e.period.replace('–', ' to ')}
            </p>
          </li>
        ))}
      </ul>
    </div>
  </Section>
);

export default Awards;
