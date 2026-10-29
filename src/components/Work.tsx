import { useState } from 'react';
import { FiArrowRight, FiGlobe } from 'react-icons/fi';
import { SiAppstore, SiGoogleplay } from 'react-icons/si';
import { projects, type Project } from '../data/projects';
import { caseStudies } from '../data/caseStudies';
import { media, SHOWCASE_IDS } from '../data/media';
import { formatUsers, liveCount, openProject, platforms, spell, statusLabel } from '../lib/ui';
import { Browser, Phones } from './Shots';
import Section from './Section';

const showcase = SHOWCASE_IDS.map((id) => projects.find((p) => p.id === id)!);
const archive = projects.filter((p) => !SHOWCASE_IDS.includes(p.id)).sort((a, b) => b.year - a.year);

const FILTERS = {
  All: () => true,
  Mobile: (p: Project) => !!(p.ios || p.android || media[p.id]?.phones),
  Web: (p: Project) => !!(p.live && p.status !== 'expired'),
} as const;
type Filter = keyof typeof FILTERS;

export const StatusDot: React.FC<{ p: Project; className?: string }> = ({ p, className = '' }) => (
  <span className={`inline-flex items-center gap-1.5 ${className}`}>
    <span className={`h-1.5 w-1.5 rounded-full ${p.status === 'live' ? 'bg-emerald-500' : 'bg-muted/50'}`} />
    {statusLabel[p.status]}
  </span>
);

/** Icon links to the website and the stores. */
export const StoreLinks: React.FC<{ p: Project }> = ({ p }) => {
  const links = [
    p.live && p.status !== 'expired' && { label: 'Website', href: p.live, Icon: FiGlobe },
    p.ios && { label: 'App Store', href: p.ios, Icon: SiAppstore },
    p.android && { label: 'Google Play', href: p.android, Icon: SiGoogleplay },
  ].filter(Boolean) as { label: string; href: string; Icon: React.ComponentType<{ className?: string }> }[];

  return (
    <div className="flex items-center gap-1">
      {links.map(({ label, href, Icon }) => (
        <a
          key={href}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={`${p.title} on ${label}`}
          title={label}
          className="grid h-9 w-9 place-items-center rounded-full text-muted transition-colors hover:bg-canvas hover:text-ink"
        >
          <Icon className="h-[15px] w-[15px]" />
        </a>
      ))}
    </div>
  );
};

const Card: React.FC<{ p: Project }> = ({ p }) => {
  const m = media[p.id];
  const hasCase = caseStudies.some((c) => c.projectId === p.id);
  const meta = [platforms(p), p.year, p.users && formatUsers(p.users)].filter(Boolean).join(' · ');
  const extra = p.tags.length - 5;

  return (
    <article className="group flex flex-col overflow-hidden rounded-[22px] border border-line bg-surface transition-[border-color,box-shadow] hover:border-ink/15 hover:shadow-[0_20px_50px_-30px_rgb(0_0_0/0.35)]">
      <button
        type="button"
        onClick={() => openProject(p.id)}
        aria-label={`Open ${p.title}`}
        style={{ backgroundColor: m.tint }}
        className="relative block h-[240px] overflow-hidden sm:h-[290px]"
      >
        {m.phones ? (
          <Phones srcs={m.phones} title={p.title} />
        ) : (
          m.browser && (
            <div className="absolute inset-x-6 top-8 transition-transform duration-500 group-hover:-translate-y-1.5 sm:inset-x-10 sm:top-10">
              <Browser shot={m.browser} dark={m.dark} title={p.title} />
            </div>
          )
        )}
      </button>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start gap-3">
          {m.icon ? (
            <img src={m.icon} alt="" className="h-11 w-11 shrink-0 rounded-[11px] border border-line" loading="lazy" />
          ) : (
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[11px] bg-canvas text-[17px] font-semibold">
              {p.title[0]}
            </span>
          )}
          <div className="min-w-0 flex-1">
            <h3 className="text-[19px] font-semibold leading-tight tracking-[-0.015em]">{p.title}</h3>
            <p className="mt-1 truncate text-[13px] text-muted">{meta}</p>
          </div>
          <StatusDot p={p} className="mt-0.5 shrink-0 rounded-full bg-canvas px-2.5 py-1 text-[12px] font-medium" />
        </div>

        <p className="mt-4 text-[15px] leading-relaxed text-ink/80">{p.summary}</p>

        <ul className="mb-6 mt-4 flex flex-wrap gap-1.5" aria-label="Tech stack">
          {p.tags.slice(0, 5).map((t) => (
            <li key={t} className="rounded-md bg-canvas px-2 py-0.5 text-[12.5px] text-ink/70">
              {t}
            </li>
          ))}
          {extra > 0 && <li className="px-1 py-0.5 text-[12.5px] text-muted">+{extra}</li>}
        </ul>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-line pt-4">
          <button
            type="button"
            onClick={() => openProject(p.id)}
            className="inline-flex items-center gap-1.5 text-[14px] font-medium hover:underline hover:underline-offset-4"
          >
            {hasCase ? 'Read the case study' : 'View details'}
            <FiArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
          <StoreLinks p={p} />
        </div>
      </div>
    </article>
  );
};

const Work: React.FC = () => {
  const [filter, setFilter] = useState<Filter>('All');
  const shown = showcase.filter(FILTERS[filter]);

  return (
    <Section
      id="work"
      title="Selected work"
      intro={`${spell(projects.length, true)} products of my own since 2022, from native iOS apps to AI SaaS. ${spell(liveCount, true)} are live today.`}
    >
      <div className="mb-6 flex gap-1.5" role="group" aria-label="Filter products">
        {(Object.keys(FILTERS) as Filter[]).map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={`btn h-8 px-3.5 text-[13.5px] ${
              filter === f ? 'bg-ink text-surface' : 'border border-line bg-surface text-muted hover:text-ink'
            }`}
          >
            {f}
            <span className="opacity-60">{showcase.filter(FILTERS[f]).length}</span>
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:gap-5">
        {shown.map((p) => (
          <Card key={p.id} p={p} />
        ))}
      </div>

      <h3 className="mt-16 text-[19px] font-semibold tracking-[-0.01em]">Earlier projects</h3>
      <ul className="mt-4 divide-y divide-line overflow-hidden rounded-[22px] border border-line bg-surface">
        {archive.map((p) => (
          <li key={p.id}>
            <button
              type="button"
              onClick={() => openProject(p.id)}
              className="group grid w-full grid-cols-[3rem_1fr_auto] items-baseline gap-x-4 px-5 py-4 text-left transition-colors hover:bg-canvas/60 sm:grid-cols-[4rem_1fr_9rem_7rem] sm:px-6"
            >
              <span className="text-[13px] tabular-nums text-muted">{p.year}</span>
              <span className="min-w-0">
                <span className="font-semibold group-hover:underline group-hover:underline-offset-4">{p.title}</span>
                <span className="mt-0.5 block text-[14px] text-muted sm:truncate">{p.summary}</span>
              </span>
              <span className="hidden text-[13.5px] text-ink/80 sm:block">{p.users ? formatUsers(p.users) : ''}</span>
              <StatusDot p={p} className="justify-self-end text-[13px] text-muted" />
            </button>
          </li>
        ))}
      </ul>
    </Section>
  );
};

export default Work;
