import type { ProjectMedia } from '../data/media';

/** Three phone screens, the middle one raised. Sized by the parent's height. */
export const Phones: React.FC<{ srcs: string[]; title: string; className?: string }> = ({ srcs, title, className = '' }) => (
  <div className={`flex h-full items-end justify-center gap-3 px-6 pt-8 sm:gap-4 ${className}`}>
    {srcs.slice(0, 3).map((src, i) => (
      <div
        key={src}
        className={`phone aspect-[9/19.5] h-[88%] shrink-0 !rounded-[18px] !border-[4px] transition-transform duration-500 ${
          i === 1 ? 'group-hover:-translate-y-1.5' : 'translate-y-6'
        }`}
      >
        <img src={src} alt={`${title} screen ${i + 1}`} loading="lazy" className="!rounded-[14px]" />
      </div>
    ))}
  </div>
);

/** A browser window with the site's address bar. */
export const Browser: React.FC<{ shot: NonNullable<ProjectMedia['browser']>; dark?: boolean; title: string }> = ({
  shot,
  dark,
  title,
}) => (
  <div
    className={`overflow-hidden rounded-xl border shadow-[0_24px_50px_-28px_rgb(0_0_0/0.45)] ${
      dark ? 'border-white/10 bg-black' : 'border-black/10 bg-white'
    }`}
  >
    <div className={`flex h-7 items-center gap-1.5 border-b px-3 ${dark ? 'border-white/10 bg-[#1b1b1d]' : 'border-black/5 bg-[#f6f6f7]'}`}>
      {[0, 1, 2].map((i) => (
        <span key={i} className={`h-2 w-2 rounded-full ${dark ? 'bg-white/15' : 'bg-black/10'}`} />
      ))}
      <span className={`ml-2 rounded px-2 py-px text-[11px] ${dark ? 'bg-white/10 text-white/60' : 'bg-white text-black/50'}`}>
        {shot.url}
      </span>
    </div>
    <img src={shot.src} alt={`${title} website`} loading="lazy" className="block w-full" />
  </div>
);
