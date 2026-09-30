import { motion } from 'framer-motion';
import { ease } from '../lib/ui';

/** "(01) BIG TITLE ........ note" with a dashed rule under it. */
const SectionHead: React.FC<{ n: string; title: string; note?: string; tone?: 'ink' | 'paper' }> = ({
  n,
  title,
  note,
  tone = 'ink',
}) => (
  <div className={tone === 'ink' ? 'text-ink' : 'text-paper'}>
    <div className="flex items-end gap-3 pb-5 sm:gap-5">
      <span className="mb-[0.6em] text-[14px] font-semibold tabular-nums">({n})</span>
      <h2 className="display overflow-hidden text-[clamp(3rem,9vw,8.5rem)]">
        <motion.span
          className="block"
          initial={{ y: '100%' }}
          whileInView={{ y: '0%' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease }}
        >
          {title}
        </motion.span>
      </h2>
      {note && (
        <span className="mb-[0.6em] ml-auto hidden text-right text-[14px] font-medium opacity-60 md:block">
          {note}
        </span>
      )}
    </div>
    <motion.div
      className="rule-dash origin-left opacity-30"
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease }}
    />
  </div>
);

export default SectionHead;
