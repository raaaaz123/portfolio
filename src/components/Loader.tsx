import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, animate } from 'framer-motion';
import { productsShipped, usersReached } from '../lib/ui';

const LINES = [
  'init vector index',
  `load ${productsShipped} products`,
  `attach ${usersReached}+ users`,
  'ready',
];

/**
 * A short boot sequence the first time the page opens in a session.
 * Calls onDone as the curtain starts lifting so the hero intro plays under it.
 */
const Loader: React.FC<{ onDone: () => void }> = ({ onDone }) => {
  const [show, setShow] = useState(true);
  const [line, setLine] = useState(0);
  const count = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const c = animate(0, 100, {
      duration: 1.5,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => {
        if (count.current) count.current.textContent = String(Math.round(v)).padStart(3, '0');
        setLine(Math.min(LINES.length - 1, Math.floor((v / 100) * LINES.length)));
      },
      onComplete: () => {
        setShow(false);
        onDone();
      },
    });
    // Background tabs pause animation frames; never leave the page covered.
    const fallback = setTimeout(() => {
      setShow(false);
      onDone();
    }, 4000);
    return () => {
      c.stop();
      clearTimeout(fallback);
    };
  }, [onDone]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-ink p-6 text-paper sm:p-10"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden="true"
        >
          <div className="flex justify-between font-mono text-[13px] text-paper/60">
            <span>rasheed.dev</span>
            <span>AI & full-stack engineer</span>
          </div>

          <div className="flex items-end justify-between gap-6">
            <ul className="font-mono text-[13px] leading-6 sm:text-[14px]">
              {LINES.slice(0, line + 1).map((l, i) => (
                <li key={l} className={i === line ? 'text-pop' : 'text-paper/50'}>
                  <span className="text-paper/30">{'>'} </span>
                  {l}
                  {i < line && <span className="text-paper/40"> … ok</span>}
                </li>
              ))}
            </ul>
            <span ref={count} className="display text-[28vw] leading-[0.75] text-pop sm:text-[18vw]">
              000
            </span>
          </div>

          <motion.div
            className="absolute bottom-0 left-0 h-1 bg-pop"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.5, ease: [0.65, 0, 0.35, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
