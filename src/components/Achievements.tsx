import { motion } from 'framer-motion';
import { FiMapPin, FiCalendar, FiAward, FiCode, FiExternalLink } from 'react-icons/fi';
import { achievements } from '../data/achievements';

const Achievements = () => {
  return (
    <section id="achievements" className="py-20 relative overflow-hidden" style={{ backgroundColor: 'var(--notion-default-bg)' }}>
      {/* Background elements */}
      <motion.div
        className="absolute top-20 right-0 w-64 h-64 rounded-full blur-3xl"
        style={{ backgroundColor: 'var(--notion-gray-text)', opacity: 0.1 }}
        animate={{
          x: [0, -50, 0],
          y: [0, 30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-20 left-0 w-80 h-80 rounded-full blur-3xl"
        style={{ backgroundColor: 'var(--notion-gray-text)', opacity: 0.1 }}
        animate={{
          x: [0, 40, 0],
          y: [0, -20, 0],
          scale: [1, 0.8, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full text-sm font-medium shadow-sm"
            style={{
              backgroundColor: 'var(--notion-default-bg)',
              border: `1px solid var(--notion-gray-text)`,
              color: 'var(--notion-gray-text)'
            }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <FiAward className="w-4 h-4" style={{ color: 'var(--notion-gray-text)' }} />
            Recognition
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--notion-default-text)' }}>
            Hackathons & Awards
          </h2>
          <div className="w-24 h-1 mx-auto rounded-full mb-6" style={{ backgroundColor: 'var(--notion-gray-text)' }}></div>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--notion-gray-text)' }}>
            Showcasing innovative projects and competitive achievements from various hackathons
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-8 last:mb-0"
            >
              <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                {/* Left side - Event details */}
                <div className="md:w-1/3">
                  <motion.div 
                    className="backdrop-blur-sm p-4 rounded-xl shadow-sm h-full"
                    style={{
                      backgroundColor: 'var(--notion-default-bg)',
                      border: `1px solid var(--notion-gray-text)`,
                      opacity: 0.95
                    }}
                    whileHover={{ 
                      boxShadow: "0 10px 25px -5px rgba(249, 115, 22, 0.1)",
                      y: -5
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="font-semibold px-3 py-1 rounded-full text-xs inline-block mb-3" style={{
                      backgroundColor: 'var(--notion-gray-bg)',
                      color: 'var(--notion-default-text)',
                      border: `1px solid var(--notion-gray-text)`
                    }}>
                      🏆 {achievement.prize}
                    </div>
                    <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--notion-default-text)' }}>{achievement.eventName}</h3>
                    
                    <div className="flex flex-col space-y-2 mt-3">
                      <div className="flex items-center gap-2">
                        <FiMapPin className="flex-shrink-0" style={{ color: 'var(--notion-gray-text)' }} size={14} />
                        <span className="text-sm" style={{ color: 'var(--notion-gray-text)' }}>{achievement.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FiCalendar className="flex-shrink-0" style={{ color: 'var(--notion-gray-text)' }} size={14} />
                        <span className="text-sm" style={{ color: 'var(--notion-gray-text)' }}>{achievement.year}</span>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Right side - Project details */}
                <div className="md:w-2/3 relative">
                  <motion.div 
                    className="p-5 rounded-xl shadow-sm h-full"
                    style={{
                      backgroundColor: 'var(--notion-default-bg)',
                      border: `1px solid var(--notion-gray-text)`
                    }}
                    whileHover={{ 
                      boxShadow: "0 10px 25px -5px rgba(249, 115, 22, 0.1)",
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Connector line (visible only on desktop) */}
                    <div className="absolute left-0 top-1/2 transform -translate-x-full -translate-y-1/2 w-8 h-px hidden md:block" style={{ backgroundColor: 'var(--notion-gray-text)' }}></div>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <FiCode style={{ color: 'var(--notion-gray-text)' }} size={16} />
                      <h4 className="font-bold" style={{ color: 'var(--notion-default-text)' }}>{achievement.projectName}</h4>
                    </div>
                    
                    <p className="mb-4" style={{ color: 'var(--notion-gray-text)' }}>{achievement.description}</p>
                    
                    {achievement.technologies && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {achievement.technologies.map((tech) => (
                          <span 
                            key={tech} 
                            className="px-3 py-1 rounded-full text-xs font-medium"
                            style={{
                              backgroundColor: 'var(--notion-gray-bg)',
                              color: 'var(--notion-gray-text)',
                              border: `1px solid var(--notion-gray-text)`
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <a 
            href="#contact" 
            className="inline-flex items-center gap-2 font-medium transition-colors hover:text-[var(--notion-default-text)]"
            style={{ color: 'var(--notion-gray-text)' }}
          >
            <span>Let's build something amazing together</span>
            <FiExternalLink size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;