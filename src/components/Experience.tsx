import { motion } from 'framer-motion';
import { experiences } from '../data/experience';
import { FiBriefcase, FiExternalLink, FiArrowUpRight } from 'react-icons/fi';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

/* ─── Timeline Dot ─── */
const TimelineDot: React.FC<{ isFirst: boolean }> = ({ isFirst }) => (
  <div className="relative flex flex-col items-center">
    <div className={`w-3 h-3 rounded-full border-2 z-10 ${
      isFirst
        ? 'bg-primary border-primary shadow-md shadow-primary/30'
        : 'bg-card border-border'
    }`} />
  </div>
);

/* ─── Experience Card ─── */
const ExperienceCard: React.FC<{
  experience: (typeof experiences)[0];
  index: number;
  isFirst: boolean;
}> = ({ experience, index, isFirst }) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] as const }}
    className="relative flex gap-5 sm:gap-8 pb-10 last:pb-0"
  >
    {/* Timeline Line + Dot */}
    <div className="flex flex-col items-center pt-1.5">
      <TimelineDot isFirst={isFirst} />
      <div className="w-px flex-1 bg-border/60 mt-2" />
    </div>

    {/* Content */}
    <div className="flex-1 pb-2">
      {/* Period + Type */}
      <div className="flex items-center gap-2.5 mb-3 flex-wrap">
        <span className="text-xs font-medium text-muted-foreground tabular-nums">{experience.period}</span>
        {experience.type && (
          <>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span className={`text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md ${
              experience.type === 'Full-time'
                ? 'text-primary dark:text-primary bg-primary dark:bg-primary/10'
                : experience.type === 'Contract'
                ? 'text-primary dark:text-primary bg-primary dark:bg-primary/10'
                : 'text-muted-foreground bg-secondary'
            }`}>
              {experience.type}
            </span>
          </>
        )}
      </div>

      {/* Title & Company */}
      <h3 className="text-lg sm:text-xl font-bold text-foreground mb-1 leading-snug">{experience.title}</h3>
      <div className="flex items-center gap-2 mb-4">
        <FiBriefcase size={13} className="text-muted-foreground" />
        <span className="text-sm font-medium text-muted-foreground">{experience.company}</span>
      </div>

      {/* Card body */}
      <div className="rounded-xl bg-card border border-border/60 p-5 space-y-4">
        {/* Description */}
        <ul className="space-y-2.5">
          {experience.description.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed">
              <div className="w-1.5 h-1.5 rounded-full bg-primary/50 dark:bg-primary/50 mt-1.5 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>

        {/* Technologies */}
        {experience.technologies && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {experience.technologies.map((tech, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-secondary/70 dark:bg-secondary/50 text-muted-foreground border border-border/40"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Website links */}
        {experience.websites && experience.websites.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {experience.websites.map((website, i) => (
              <a
                key={i}
                href={website.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 text-xs font-medium text-primary dark:text-primary hover:text-primary dark:hover:text-primary transition-colors"
              >
                <FiExternalLink size={11} />
                {website.name}
                <FiArrowUpRight size={10} className="opacity-0 group-hover:opacity-100 -ml-0.5 transition-opacity" />
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  </motion.div>
);

/* ─── Main Experience Section ─── */
const Experience = () => {
  return (
    <section id="experience" className="py-16 sm:py-20 bg-background text-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <motion.span
            className="inline-block text-sm font-semibold uppercase tracking-widest text-primary dark:text-primary mb-3"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Career
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-foreground tracking-tight">
            Work Experience
          </h2>
          <p className="text-base sm:text-lg max-w-xl mx-auto text-muted-foreground leading-relaxed">
            From indie SaaS to enterprise AI — building products that ship and scale.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto">
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={index}
              experience={experience}
              index={index}
              isFirst={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
