import { motion } from 'framer-motion';

/** Sections in page order, numbered in their eyebrow. */
const ORDER = ['experience', 'work', 'stack', 'awards'];

/** A section: heading and optional intro side by side on wide screens, then content. */
const Section: React.FC<{
  id: string;
  title: string;
  intro?: React.ReactNode;
  children: React.ReactNode;
}> = ({ id, title, intro, children }) => {
  const n = ORDER.indexOf(id) + 1;

  return (
    <section id={id} className="page py-12 sm:py-16">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="eyebrow">
          <span className="text-link">//</span> {n > 0 && `${String(n).padStart(2, '0')}  `}
          {id === 'work' ? 'products' : id}
        </p>
        <div className="mt-3 grid gap-4 lg:grid-cols-[1fr_1fr] lg:items-end">
          <h2 className="h2">{title}</h2>
          {intro && <p className="max-w-text text-[15px] text-muted lg:justify-self-end">{intro}</p>}
        </div>
      </motion.div>
      <motion.div
        className="mt-8"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </section>
  );
};

export default Section;
