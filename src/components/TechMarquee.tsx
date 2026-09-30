import type { IconType } from 'react-icons';
import {
  SiOpenai,
  SiAnthropic,
  SiGooglegemini,
  SiLangchain,
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiPython,
  SiFastapi,
  SiSwift,
  SiFlutter,
  SiKotlin,
  SiNodedotjs,
  SiPostgresql,
  SiRedis,
  SiMongodb,
  SiDocker,
  SiAmazonwebservices,
  SiFirebase,
  SiTailwindcss,
} from 'react-icons/si';

const TOOLS: [string, IconType][] = [
  ['OpenAI', SiOpenai],
  ['Claude', SiAnthropic],
  ['Gemini', SiGooglegemini],
  ['LangChain', SiLangchain],
  ['Next.js', SiNextdotjs],
  ['React Native', SiReact],
  ['TypeScript', SiTypescript],
  ['Python', SiPython],
  ['FastAPI', SiFastapi],
  ['SwiftUI', SiSwift],
  ['Flutter', SiFlutter],
  ['Kotlin', SiKotlin],
  ['Node.js', SiNodedotjs],
  ['PostgreSQL', SiPostgresql],
  ['Redis', SiRedis],
  ['MongoDB', SiMongodb],
  ['Docker', SiDocker],
  ['AWS', SiAmazonwebservices],
  ['Firebase', SiFirebase],
  ['Tailwind', SiTailwindcss],
];

/** Recognisable logos, so the stack reads at a glance. Pauses on hover. */
const TechMarquee = () => {
  const row = (hidden?: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {TOOLS.map(([name, Icon]) => (
        <li
          key={name}
          className="group mx-2 flex items-center gap-3 rounded-full border-[1.5px] border-transparent px-4 py-2 transition-colors hover:border-ink hover:bg-pop"
        >
          <Icon className="text-[26px] text-ink/70 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110 group-hover:text-ink" aria-hidden="true" />
          <span className="whitespace-nowrap text-[17px] font-semibold text-ink/80 group-hover:text-ink">{name}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <section aria-label="Tools I ship with" className="overflow-hidden border-b-[1.5px] border-ink bg-paper py-5">
      <div className="group/m flex w-max animate-[marquee_45s_linear_infinite] hover:[animation-play-state:paused] motion-reduce:animate-none">
        {row()}
        {row(true)}
      </div>
    </section>
  );
};

export default TechMarquee;
