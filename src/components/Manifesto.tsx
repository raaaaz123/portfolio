import { motion, useReducedMotion } from 'framer-motion';
import { ease } from '../lib/ui';

const LINES = [
  { lead: 'I build', block: 'the AI layer.', bg: 'bg-pop', fg: 'text-ink', tilt: -1.5 },
  { lead: 'I build', block: 'the product.', bg: 'bg-sun', fg: 'text-ink', tilt: 1 },
  { lead: 'I ship', block: 'to the stores.', bg: 'bg-mint', fg: 'text-ink', tilt: -0.8 },
];

/**
 * Each line's highlight block wipes in from the left as it enters view,
 * and the words inside flip colour once the block is under them.
 */
const Manifesto = () => {
  const still = !!useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-paper py-24 text-ink sm:py-32" aria-label="About">
      <div className="shell">
        <h2 className="display text-[clamp(3rem,8.6vw,9.5rem)] leading-[0.92]">
          {LINES.map((l, i) => (
            <motion.span
              key={l.block}
              className="flex flex-wrap items-baseline gap-x-[0.22em]"
              initial="hidden"
              whileInView="shown"
              viewport={{ once: true, margin: '-15% 0px' }}
            >
              <motion.span
                variants={{ hidden: { opacity: 0, x: still ? 0 : -40 }, shown: { opacity: 1, x: 0 } }}
                transition={{ duration: 0.7, delay: i * 0.12, ease }}
              >
                {l.lead}
              </motion.span>
              <span className="relative inline-block px-[0.12em]">
                <motion.span
                  aria-hidden="true"
                  className={`absolute inset-x-0 -inset-y-[0.02em] origin-left ${l.bg}`}
                  style={{ rotate: l.tilt }}
                  variants={{ hidden: { scaleX: 0 }, shown: { scaleX: 1 } }}
                  transition={{ duration: 0.75, delay: 0.25 + i * 0.12, ease }}
                />
                <motion.span
                  className="relative"
                  variants={{
                    hidden: { color: 'hsl(var(--ink))' },
                    shown: { color: l.fg === 'text-paper' ? 'hsl(var(--paper))' : 'hsl(var(--ink))' },
                  }}
                  transition={{ duration: 0.3, delay: 0.55 + i * 0.12 }}
                >
                  {l.block}
                </motion.span>
              </span>
            </motion.span>
          ))}
        </h2>
      </div>
    </section>
  );
};

export default Manifesto;
