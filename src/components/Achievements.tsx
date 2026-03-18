import { motion } from 'framer-motion';
import { FiMapPin, FiCalendar, FiCode, FiAward } from 'react-icons/fi';
import { achievements } from '../data/achievements';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const getPrizeStyle = (prize: string) => {
  if (prize.includes('1st'))
    return { badge: 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200/60 dark:border-amber-500/20', dot: 'bg-amber-500' };
  if (prize.includes('2nd'))
    return { badge: 'bg-slate-50 dark:bg-slate-500/10 text-slate-600 dark:text-slate-300 border-slate-200/60 dark:border-slate-500/20', dot: 'bg-slate-400' };
  return { badge: 'bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-200/60 dark:border-orange-500/20', dot: 'bg-orange-500' };
};

/* ─── Achievement Card — horizontal layout ─── */
const AchievementCard: React.FC<{
  achievement: (typeof achievements)[0];
  index: number;
}> = ({ achievement, index }) => {
  const prize = getPrizeStyle(achievement.prize);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex gap-5"
    >
      {/* Timeline dot + line */}
      <div className="hidden sm:flex flex-col items-center pt-1.5">
        <div className={`w-3 h-3 rounded-full ${prize.dot} shadow-sm z-10`} />
        <div className="w-px flex-1 bg-border/50 mt-2" />
      </div>

      {/* Card */}
      <div className="flex-1 rounded-2xl bg-card border border-border/60 group-hover:border-teal-500/20 dark:group-hover:border-teal-400/15 p-5 sm:p-6 transition-all duration-300 group-hover:shadow-md group-hover:shadow-teal-500/[0.04] mb-2">
        {/* Row 1: Prize + Meta */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold border w-fit ${prize.badge}`}>
            <FiAward size={11} />
            {achievement.prize}
          </span>
          <div className="flex items-center gap-3 text-[11px] text-muted-foreground sm:ml-auto">
            <span className="flex items-center gap-1">
              <FiCalendar size={10} />
              {achievement.year}
            </span>
            <span className="flex items-center gap-1">
              <FiMapPin size={10} />
              {achievement.location}
            </span>
          </div>
        </div>

        {/* Row 2: Event + Project inline */}
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 mb-2">
          <h3 className="text-base font-bold text-foreground leading-snug">{achievement.eventName}</h3>
          <div className="flex items-center gap-1.5">
            <FiCode size={12} className="text-teal-600 dark:text-teal-400" />
            <span className="text-sm font-medium text-teal-600 dark:text-teal-400">{achievement.projectName}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed mb-3">
          {achievement.description}
        </p>

        {/* Tech Tags */}
        {achievement.technologies && (
          <div className="flex flex-wrap gap-1.5">
            {achievement.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-secondary/70 dark:bg-secondary/50 text-muted-foreground border border-border/40"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

/* ─── Main Achievements Section ─── */
const Achievements = () => {
  return (
    <section id="achievements" className="py-16 sm:py-20 relative overflow-hidden bg-background text-foreground">
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
            Recognition
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-foreground tracking-tight">
            Hackathons & Awards
          </h2>
          <p className="text-base sm:text-lg max-w-xl mx-auto text-muted-foreground leading-relaxed">
            Competitive wins from national-level hackathons building real-world solutions.
          </p>
        </motion.div>

        {/* Timeline Cards */}
        <div className="max-w-3xl mx-auto">
          {achievements.map((achievement, index) => (
            <AchievementCard key={achievement.id} achievement={achievement} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
