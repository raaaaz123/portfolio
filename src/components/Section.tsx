import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ease } from '../lib/ui';

/**
 * One section chrome for the whole site: an index, a path-style title and a
 * hairline that draws itself in. No eyebrow badge, no 5xl heading, no blurb —
 * the content below is the description.
 */
const Section: React.FC<{
  id: string;
  index: string;
  /** Rendered as a path, e.g. "selected-work" → ~/selected-work */
  path: string;
  aside?: ReactNode;
  children: ReactNode;
}> = ({ id, index, path, aside, children }) => (
  <section id={id} className="relative z-10 scroll-mt-24 py-11 sm:py-16">
    <div className="shell">
      <motion.div
        initial="rest"
        whileInView="run"
        viewport={{ once: true, margin: '-60px' }}
        className="mb-7 sm:mb-9"
      >
        <motion.div
          variants={{ rest: { scaleX: 0 }, run: { scaleX: 1 } }}
          transition={{ duration: 0.9, ease }}
          className="rule mb-4 origin-left"
        />
        <motion.div
          variants={{ rest: { opacity: 0, y: 8 }, run: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.5, delay: 0.15, ease }}
          className="flex items-baseline gap-4"
        >
          <span className="label tabular-nums text-primary">{index}</span>
          <h2 className="font-mono text-[13px] font-medium tracking-[0.14em] text-foreground">
            <span className="text-muted-foreground/60">~/</span>
            {path}
          </h2>
          {aside && <span className="label ml-auto tabular-nums">{aside}</span>}
        </motion.div>
      </motion.div>

      {children}
    </div>
  </section>
);

export default Section;
