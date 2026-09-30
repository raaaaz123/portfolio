import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { achievements } from '../data/achievements';
import { ease } from '../lib/ui';
import SectionHead from './SectionHead';

const place = (prize: string) => prize.match(/(\d)(st|nd|rd|th)/i)?.[0] ?? '★';
const coins = ['bg-pop', 'bg-sun', 'bg-mint'];

/** A medal that flips in 3D: the podium on the front, the project on the back. */
const Medal: React.FC<{ a: (typeof achievements)[number]; i: number }> = ({ a, i }) => {
  const still = !!useReducedMotion();
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.li
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, delay: i * 0.12, ease }}
      className="flex flex-col items-center text-center"
    >
      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        onPointerEnter={(e) => e.pointerType === 'mouse' && setFlipped(true)}
        onPointerLeave={(e) => e.pointerType === 'mouse' && setFlipped(false)}
        aria-pressed={flipped}
        aria-label={`${a.prize} at ${a.eventName}. ${flipped ? 'Showing project' : 'Show project'}`}
        className="relative h-[240px] w-[240px] rounded-full sm:h-[260px] sm:w-[260px] xl:h-[290px] xl:w-[290px]"
        style={{ perspective: 1000 }}
      >
        <motion.span
          className="relative block h-full w-full"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={still ? { duration: 0 } : { type: 'spring', stiffness: 90, damping: 14 }}
        >
          {/* Front */}
          <span
            className={`absolute inset-0 flex flex-col items-center justify-center rounded-full border-[1.5px] border-ink text-ink shadow-[inset_0_-14px_0_0_rgba(0,0,0,0.12),8px_8px_0_0_hsl(var(--ink))] ${coins[i % coins.length]}`}
            style={{ backfaceVisibility: 'hidden' }}
          >
            <span className="absolute inset-3 rounded-full border-[1.5px] border-dashed border-ink/40" />
            <span className="display text-[92px] leading-[0.8] sm:text-[108px]">{place(a.prize)}</span>
            <span className="mt-2 text-[14px] font-bold">place, national level</span>
            <span className="mt-1 text-[13px] font-semibold opacity-70">{a.year}</span>
          </span>
          {/* Back */}
          <span
            className="absolute inset-0 flex flex-col items-center justify-center rounded-full border-[1.5px] border-pop bg-ink p-9 text-paper shadow-[8px_8px_0_0_hsl(var(--pop))]"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <span className="text-[12px] font-semibold text-pop">Built</span>
            <span className="display mt-1 text-[30px] leading-[0.95]">{a.projectName}</span>
            <span className="mt-3 text-[12px] leading-snug text-paper/70">
              {a.technologies?.slice(0, 3).join(', ')}
            </span>
          </span>
        </motion.span>
      </button>

      <h3 className="display mt-8 text-[40px]">{a.eventName}</h3>
      <p className="mt-1 text-[15px] text-muted-foreground">{a.location}</p>
      <p className="mt-3 max-w-[34ch] text-[15px] leading-snug text-ink/80">{a.description}</p>
    </motion.li>
  );
};

const Awards = () => (
  <section id="awards" className="bg-paper pb-24 pt-20 text-ink sm:pb-32 sm:pt-28">
    <div className="shell">
      <SectionHead n="05" title="Podiums" note="Hover or tap a medal to flip it" />
      <ul className="mt-16 grid gap-16 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-8">
        {achievements.map((a, i) => (
          <Medal key={a.id} a={a} i={i} />
        ))}
      </ul>
    </div>
  </section>
);

export default Awards;
