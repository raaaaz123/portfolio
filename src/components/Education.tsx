import { motion } from 'framer-motion';
import { FiCalendar, FiMapPin } from 'react-icons/fi';
import { education } from '../data/education';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

/* ─── Education Card ─── */
const EducationCard: React.FC<{
  item: (typeof education)[0];
  index: number;
}> = ({ item, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    className="group relative"
  >
    {/* Gradient border on hover */}
    <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-teal-500/0 via-cyan-500/0 to-emerald-500/0 group-hover:from-teal-500/15 group-hover:via-cyan-500/15 group-hover:to-emerald-500/15 transition-all duration-500 pointer-events-none" />

    <div className="relative rounded-2xl bg-card border border-border/60 group-hover:border-teal-500/20 dark:group-hover:border-teal-400/15 p-6 sm:p-7 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-teal-500/[0.04]">
      <div className="flex flex-col sm:flex-row sm:items-start gap-5">
        {/* Icon */}
        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-500/10 border border-teal-200/50 dark:border-teal-500/15 flex items-center justify-center">
          <FiMapPin size={20} className="text-teal-600 dark:text-teal-400" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Period */}
          <div className="flex items-center gap-1.5 mb-2">
            <FiCalendar size={12} className="text-muted-foreground" />
            <span className="text-xs font-medium text-muted-foreground tabular-nums">{item.period}</span>
          </div>

          {/* Degree */}
          <h3 className="text-lg sm:text-xl font-bold text-foreground mb-1 leading-snug">
            {item.degree}
          </h3>

          {/* Institution */}
          <p className="text-sm font-medium text-muted-foreground mb-3">{item.institution}</p>

          {/* Description */}
          {item.description && (
            <p className="text-sm text-muted-foreground leading-relaxed px-4 py-3 rounded-xl bg-secondary/50 dark:bg-secondary/30 border border-border/30">
              {item.description}
            </p>
          )}
        </div>
      </div>
    </div>
  </motion.div>
);

/* ─── Main Education Section ─── */
const Education = () => {
  return (
    <section id="education" className="py-16 sm:py-20 bg-background text-foreground relative">
      {/* Subtle gradient */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-secondary/20 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <motion.span
            className="inline-block text-sm font-semibold uppercase tracking-widest text-teal-600 dark:text-teal-400 mb-3"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Background
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-foreground tracking-tight">
            Education
          </h2>
          <p className="text-base sm:text-lg max-w-xl mx-auto text-muted-foreground leading-relaxed">
            Computer Science foundations from diploma through B.Tech.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="max-w-2xl mx-auto space-y-5">
          {education.map((item, index) => (
            <EducationCard key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
