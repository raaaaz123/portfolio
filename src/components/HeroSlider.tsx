import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { projects } from '../data/projects';
import { media } from '../data/media';
import { formatUsers, openProject } from '../lib/ui';

const SLIDE_IDS = [4, 103, 100, 0];
const INTERVAL = 4500;

const slides = SLIDE_IDS.map((id) => ({ p: projects.find((x) => x.id === id)!, m: media[id] }));

/** Hero slider of real product screens: rotates on its own, pauses on hover. */
const HeroSlider: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const still = !!useReducedMotion();
  const { p, m } = slides[index];

  useEffect(() => {
    if (paused || still) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % slides.length), INTERVAL);
    return () => clearTimeout(t);
  }, [index, paused, still]);

  return (
    <div
      className="w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <button
        type="button"
        onClick={() => openProject(p.id)}
        aria-label={`Open ${p.title}`}
        style={{ backgroundColor: m.tint }}
        className="relative block h-[260px] w-full overflow-hidden rounded-[22px] text-left transition-colors duration-500 sm:h-[360px] lg:h-[400px] lg:rounded-[28px]"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            {m.phones ? (
              <div className="flex h-full items-end justify-center gap-3 px-5 pt-6 lg:gap-6">
                {m.phones.map((src, i) => (
                  <div
                    key={src}
                    className={`phone h-[210px] w-[97px] shrink-0 !rounded-[16px] !border-[3px] sm:h-[290px] sm:w-[134px] sm:!rounded-[20px] lg:h-[330px] lg:w-[152px] lg:!border-[4px] ${
                      i === 1 ? '' : 'translate-y-6 lg:translate-y-8'
                    }`}
                  >
                    <img src={src} alt="" />
                  </div>
                ))}
              </div>
            ) : (
              m.browser && (
                <div className="flex h-full items-start justify-center px-5 pt-14 sm:px-10 lg:pt-16">
                  <div
                    className={`w-full max-w-[780px] overflow-hidden rounded-t-xl border border-b-0 shadow-[0_24px_50px_-24px_rgb(0_0_0/0.45)] ${
                      m.dark ? 'border-white/10 bg-black' : 'border-black/10 bg-white'
                    }`}
                  >
                    <div
                      className={`flex h-6 items-center border-b px-2.5 ${
                        m.dark ? 'border-white/10 bg-[#1b1b1d]' : 'border-black/5 bg-[#f6f6f7]'
                      }`}
                    >
                      <span
                        className={`rounded px-2 py-px text-[10.5px] ${m.dark ? 'bg-white/10 text-white/60' : 'bg-white text-black/50'}`}
                      >
                        {m.browser.url}
                      </span>
                    </div>
                    <img src={m.browser.src} alt="" className="block w-full" />
                  </div>
                </div>
              )
            )}
          </motion.div>
        </AnimatePresence>

        {/* Caption */}
        <span
          className={`absolute left-4 top-4 z-10 rounded-full px-3 py-1 text-[12.5px] font-medium backdrop-blur ${
            m.dark ? 'bg-white/15 text-white' : 'bg-white/80 text-[#14161a]'
          }`}
        >
          {p.title}
          {p.users && <span className="opacity-60">, {formatUsers(p.users)}</span>}
        </span>
      </button>

      {/* Tabs */}
      <div className="mt-4 grid grid-cols-4 gap-2 lg:gap-5" role="tablist" aria-label="Products">
        {slides.map((s, i) => (
          <button
            key={s.p.id}
            type="button"
            role="tab"
            aria-selected={i === index}
            onClick={() => setIndex(i)}
            className="group text-left"
          >
            <span className="block h-[3px] overflow-hidden rounded-full bg-line">
              <span
                key={`${index}-${paused}`}
                className="block h-full rounded-full bg-ink"
                style={
                  i < index || (i === index && (paused || still))
                    ? { width: '100%' }
                    : i === index
                      ? { width: '100%', animation: `slider-progress ${INTERVAL}ms linear both` }
                      : { width: 0 }
                }
              />
            </span>
            <span
              className={`mt-2 block truncate text-[12.5px] transition-colors lg:text-[14px] ${
                i === index ? 'font-medium text-ink' : 'text-muted group-hover:text-ink'
              }`}
            >
              {s.p.title}
            </span>
            <span className="mt-0.5 hidden text-[12.5px] leading-snug text-muted lg:line-clamp-2">{s.p.summary}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
