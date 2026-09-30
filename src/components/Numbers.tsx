import { useEffect, useRef } from 'react';
import { animate, motion, useInView, useReducedMotion } from 'framer-motion';
import { projects } from '../data/projects';
import { achievements } from '../data/achievements';
import { ease, productsShipped, usersReached } from '../lib/ui';
import SectionHead from './SectionHead';

const usersOf = (u?: string) => (u ? parseFloat(u) * (/k/i.test(u) ? 1000 : 1) : 0);
const biggest = [...projects].sort((a, b) => usersOf(b.users) - usersOf(a.users))[0];
const firstYear = Math.min(...projects.map((p) => p.year));
const liveCount = projects.filter((p) => p.status === 'live').length;

const ROWS = [
  {
    label: 'Products shipped',
    note: `Web, iOS and Android, ${firstYear} to now`,
    value: productsShipped,
    unit: '',
    bg: 'bg-pop',
  },
  {
    label: 'People using them',
    note: 'Across all products',
    value: parseInt(usersReached),
    unit: 'k+',
    bg: 'bg-mint',
  },
  {
    label: 'Largest single app',
    note: `${biggest.title}, ${biggest.role ?? ''}`.replace(/, $/, ''),
    value: usersOf(biggest.users) / 1000,
    unit: 'k+',
    bg: 'bg-sun',
  },
  {
    label: 'Still live today',
    note: 'Web and app stores',
    value: liveCount,
    unit: '',
    bg: 'bg-moss text-paper',
  },
  {
    label: 'Hackathon podiums',
    note: 'National-level, 2022–2023',
    value: achievements.length,
    unit: '',
    bg: 'bg-mint',
  },
];

const Count: React.FC<{ to: number }> = ({ to }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const still = !!useReducedMotion();

  useEffect(() => {
    if (!inView || !ref.current) return;
    if (still) {
      ref.current.textContent = String(to);
      return;
    }
    const c = animate(0, to, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => ref.current && (ref.current.textContent = String(Math.round(v))),
    });
    return () => c.stop();
  }, [inView, to, still]);

  return <span ref={ref}>0</span>;
};

const Numbers = () => (
  <section id="numbers" className="border-t-[1.5px] border-ink bg-[#ECF0D6] pb-24 pt-20 text-ink sm:pb-32 sm:pt-28">
    <div className="shell">
      <SectionHead n="03" title="In numbers" />

      <ul>
        {ROWS.map((r, i) => (
          <motion.li
            key={r.label}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease }}
            className="flex items-center gap-6 border-b-[1.5px] border-dashed border-ink/25 py-6 sm:py-7"
          >
            <div className="min-w-0 flex-1">
              <p className="text-[17px] font-bold sm:text-[20px]">{r.label}</p>
              <p className="mt-1 text-[14px] text-muted-foreground sm:text-[15px]">{r.note}</p>
            </div>
            <motion.div
              initial={{ rotate: 0, scale: 0.9 }}
              whileInView={{ rotate: i % 2 ? 1.5 : -1.5, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.1 }}
              className={`display flex min-w-[150px] items-end justify-end gap-1 border-[1.5px] border-ink px-5 py-2 text-[64px] sm:min-w-[240px] sm:text-[104px] ${r.bg}`}
            >
              <Count to={r.value} />
              {r.unit && <span className="mb-[0.12em] text-[0.36em]">{r.unit}</span>}
            </motion.div>
          </motion.li>
        ))}
      </ul>
    </div>
  </section>
);

export default Numbers;
