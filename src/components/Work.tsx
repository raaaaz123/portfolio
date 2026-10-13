import { projects, type Project } from '../data/projects';
import { caseStudies } from '../data/caseStudies';
import { media, SHOWCASE_IDS, type ProjectMedia } from '../data/media';
import { formatUsers, liveCount, openProject, projectLinks, spell } from '../lib/ui';
import Section from './Section';

const showcase = SHOWCASE_IDS.map((id) => projects.find((p) => p.id === id)!);
const rest = projects.filter((p) => !SHOWCASE_IDS.includes(p.id)).sort((a, b) => b.year - a.year);

const platforms = (p: Project) =>
  [p.ios && 'iOS', p.android && 'Android', p.live && p.status !== 'expired' && 'Web'].filter(Boolean).join(', ');

const Media: React.FC<{ m: ProjectMedia; title: string }> = ({ m, title }) => {
  if (m.phones)
    return (
      <div className="flex h-full items-end justify-center gap-2.5 overflow-hidden px-4 pt-6 lg:gap-4 lg:px-6 lg:pt-10">
        {m.phones.map((src, i) => (
          <div
            key={src}
            className={`phone h-[200px] w-[92px] shrink-0 !rounded-[16px] !border-[3px] sm:h-[260px] sm:w-[120px] lg:h-[330px] lg:w-[152px] lg:!rounded-[22px] lg:!border-[5px] xl:h-[357px] xl:w-[165px] ${
              i === 1 ? '' : 'translate-y-5 lg:translate-y-8'
            } ${i === 2 ? 'lg:hidden xl:block' : ''}`}
          >
            <img src={src} alt={`${title} screen ${i + 1}`} loading="lazy" />
          </div>
        ))}
      </div>
    );

  if (m.browser)
    return (
      <div className="flex h-full items-center py-5 pl-4 sm:pl-10 lg:py-10">
        <div
          className={`w-full overflow-hidden rounded-l-xl border border-r-0 shadow-[0_30px_60px_-30px_rgb(0_0_0/0.35)] ${
            m.dark ? 'border-white/10 bg-black' : 'border-black/10 bg-white'
          }`}
        >
          <div className={`flex h-8 items-center border-b px-3 ${m.dark ? 'border-white/10 bg-[#1b1b1d]' : 'border-black/5 bg-[#f6f6f7]'}`}>
            <span className={`rounded-md px-2.5 py-0.5 text-[11.5px] ${m.dark ? 'bg-white/10 text-white/60' : 'bg-white text-black/50'}`}>
              {m.browser.url}
            </span>
          </div>
          <img src={m.browser.src} alt={`${title} website`} loading="lazy" className="block w-full" />
        </div>
      </div>
    );

  return null;
};

const Panel: React.FC<{ p: Project; flip: boolean }> = ({ p, flip }) => {
  const m = media[p.id];
  const hasCase = caseStudies.some((c) => c.projectId === p.id);
  const facts = [
    ['Users', p.users ? formatUsers(p.users).replace(' users', '') : 'Just launched'],
    ['Runs on', platforms(p)],
    p.status === 'live' ? ['Year', String(p.year)] : ['Status', `${p.status === 'expired' ? 'Offline' : 'Discontinued'}, ${p.year}`],
  ];

  return (
    <article
      style={{ backgroundColor: m.tint }}
      className={`grid overflow-hidden rounded-[22px] lg:grid-cols-2 lg:rounded-[28px] ${m.dark ? 'text-white' : 'text-[#14161a]'}`}
    >
      <div className={`flex flex-col p-5 sm:p-8 lg:p-10 ${flip ? 'lg:order-2' : ''}`}>
        {m.icon && <img src={m.icon} alt="" className="mb-3 h-9 w-9 rounded-lg lg:mb-6 lg:h-12 lg:w-12 lg:rounded-xl" loading="lazy" />}
        <h3 className="text-[22px] font-semibold leading-tight tracking-[-0.02em] lg:text-[34px]">{p.title}</h3>
        <p className={`mt-1.5 max-w-[30rem] text-[15px] leading-relaxed lg:mt-3 lg:text-[17px] ${m.dark ? 'text-white/70' : 'text-black/60'}`}>
          <span className="lg:hidden">{p.summary}</span>
          <span className="hidden lg:inline">{p.description.split('. ').slice(0, 2).join('. ').replace(/\.?$/, '.')}</span>
        </p>

        <dl className={`mt-4 grid max-w-[30rem] grid-cols-3 gap-3 border-t pt-3 lg:mt-8 lg:gap-4 lg:pt-5 ${m.dark ? 'border-white/15' : 'border-black/10'}`}>
          {facts.map(([k, v]) => (
            <div key={k}>
              <dt className={`text-[12px] lg:text-[13px] ${m.dark ? 'text-white/55' : 'text-black/50'}`}>{k}</dt>
              <dd className="mt-0.5 text-[13.5px] font-medium leading-snug lg:text-[15px]">{v}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 hidden max-w-[30rem] flex-wrap gap-1.5 lg:flex">
          {p.tags.slice(0, 6).map((t) => (
            <span
              key={t}
              className={`rounded-full px-2.5 py-1 text-[13px] ${m.dark ? 'bg-white/10 text-white/80' : 'bg-black/[0.06] text-black/70'}`}
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 lg:mt-auto lg:gap-x-5 lg:gap-y-3 lg:pt-10">
          <button
            type="button"
            onClick={() => openProject(p.id)}
            className={`btn h-9 px-4 text-[14px] lg:h-10 lg:px-5 lg:text-[15px] ${m.dark ? 'bg-white text-black hover:bg-white/85' : 'bg-[#14161a] text-white hover:bg-black/80'}`}
          >
            {hasCase ? 'Read the case study' : 'See the details'}
          </button>
          {projectLinks(p).map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="a text-[14px] lg:text-[15px]">
              {l.label}
            </a>
          ))}
        </div>
      </div>

      <div className={`lg:min-h-[300px] ${flip ? 'lg:order-1' : ''}`}>
        <Media m={m} title={p.title} />
      </div>
    </article>
  );
};

const Tile: React.FC<{ p: Project }> = ({ p }) => {
  const note = p.status === 'live' ? 'Live' : p.status === 'expired' ? 'Offline' : 'Discontinued';
  return (
    <button
      type="button"
      onClick={() => openProject(p.id)}
      className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-5 text-left lg:p-6 transition-colors hover:border-ink/25"
    >
      <p className="flex items-center gap-2 text-[13px] text-muted">
        <span className={`h-1.5 w-1.5 rounded-full ${p.status === 'live' ? 'bg-emerald-500' : 'bg-muted/40'}`} />
        {note}, {p.year}
      </p>
      <h3 className="mt-3 text-[19px] font-semibold tracking-[-0.01em] group-hover:underline group-hover:decoration-ink/30 group-hover:underline-offset-4">
        {p.title}
      </h3>
      <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{p.summary}</p>
      {p.users && <p className="mt-auto pt-5 text-[14px] font-medium">{formatUsers(p.users)}</p>}
    </button>
  );
};

const Work: React.FC = () => (
  <Section
    id="work"
    title="Products"
    intro={`${spell(projects.length, true)} products of my own since 2022. ${spell(liveCount, true)} are still live.`}
  >
    <div className="space-y-4 lg:space-y-6">
      {showcase.map((p, i) => (
        <Panel key={p.id} p={p} flip={i % 2 === 1} />
      ))}
    </div>

    <h3 className="mt-20 text-[22px] font-semibold tracking-[-0.015em]">More projects</h3>
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {rest.map((p) => (
        <Tile key={p.id} p={p} />
      ))}
    </div>
  </Section>
);

export default Work;
