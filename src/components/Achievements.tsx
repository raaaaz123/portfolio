import { motion } from 'framer-motion';
import { FiMapPin, FiCalendar } from 'react-icons/fi';
import { achievements } from '../data/achievements';

const Achievements = () => {
  return (
    <section id="achievements" className="py-20 bg-primary-50">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl font-bold text-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Hackathons & Awards
        </motion.h2>
        
        <motion.p
          className="text-gray-600 text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Showcasing my competitive achievements and innovative projects from various hackathons
        </motion.p>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline Line - Hidden on mobile, visible on md screens and up */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/20 rounded-full" />
            
            {/* Mobile timeline line - visible only on small screens */}
            <div className="md:hidden absolute left-4 h-full w-1 bg-primary/20 rounded-full" />
            
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative mb-12 md:mb-24 ${
                  index % 2 === 0 
                    ? 'md:pr-12 md:text-right md:ml-auto md:mr-1/2 pl-12 md:pl-0' 
                    : 'md:pl-12 md:ml-1/2 pl-12'
                }`}
              >
                {/* Timeline Dot - Different positioning for mobile vs desktop */}
                <div 
                  className={`absolute top-0 w-6 h-6 bg-primary rounded-full border-4 border-white shadow-md
                    ${index % 2 === 0 
                      ? 'md:left-auto md:right-0 md:translate-x-1/2 left-4 -translate-x-1/2' 
                      : 'md:left-0 md:-translate-x-1/2 left-4 -translate-x-1/2'
                    }`}
                />
                
                <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-primary-100 hover:shadow-md transition-shadow">
                  <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
                    <div className="bg-primary/10 text-primary font-semibold px-3 py-1 rounded-full text-xs sm:text-sm">
                      🏆 {achievement.prize}
                    </div>
                  </div>
                  
                  <h3 className="text-lg sm:text-xl font-bold mb-2">{achievement.eventName}</h3>
                  
                  <div className="flex flex-wrap items-center text-xs sm:text-sm text-gray-600 mb-4 gap-y-1">
                    <div className="flex items-center mr-3">
                      <FiMapPin className="mr-1 flex-shrink-0 text-primary-600" size={14} />
                      <span>{achievement.location}</span>
                    </div>
                    <div className="flex items-center">
                      <FiCalendar className="mr-1 flex-shrink-0 text-primary-600" size={14} />
                      <span>{achievement.year}</span>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="font-medium text-sm sm:text-base">📌 {achievement.projectName}</div>
                    <p className="text-gray-700 text-sm sm:text-base mt-1">💡 {achievement.description}</p>
                  </div>
                  
                  {achievement.technologies && (
                    <div className="mt-4">
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {achievement.technologies.map((tech) => (
                          <span 
                            key={tech} 
                            className="bg-primary-50 text-primary-700 text-xs px-2 py-0.5 rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements; 