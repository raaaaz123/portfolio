import { motion } from 'framer-motion';
import { experiences } from '../data/experience';
import { FiBriefcase, FiExternalLink } from 'react-icons/fi';

const Experience = () => {
  return (
    <section id="experience" className="py-20 bg-gradient-to-b from-white to-primary-50">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Experience
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-4" />
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {experiences.map((experience, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-8 last:mb-0"
            >
              <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                {/* Left side - Timeline marker */}
                <div className="md:w-1/3">
                  <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-primary-100 h-full">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-3 h-3 bg-primary rounded-full"></span>
                      <span className="text-sm font-medium text-gray-500">{experience.period}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800">{experience.title}</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <FiBriefcase className="text-primary" size={14} />
                      <span className="text-sm text-gray-600">{experience.company}</span>
                    </div>
                    {experience.type && (
                      <div className="mt-2">
                        <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                          {experience.type}
                        </span>
                      </div>
                    )}
                    
                    {/* Website links */}
                    {experience.websites && experience.websites.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {experience.websites.map((website, i) => (
                          <a 
                            key={i}
                            href={website.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors text-sm font-medium"
                          >
                            <FiExternalLink size={12} />
                            {website.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Right side - Content */}
                <div className="md:w-2/3 relative">
                  <div className="bg-white/90 backdrop-blur-sm p-5 rounded-xl shadow-sm border border-primary-100 h-full">
                    {/* Connector line (visible only on desktop) */}
                    <div className="absolute left-0 top-1/2 transform -translate-x-full -translate-y-1/2 w-8 h-px bg-primary-200 hidden md:block"></div>
                    
                    <ul className="space-y-2 mb-4">
                      {experience.description.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-primary mr-2 mt-1">•</span>
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="flex flex-wrap gap-2 mt-4">
                      {experience.technologies?.map((tech, i) => (
                        <span 
                          key={i}
                          className="px-3 py-1 bg-primary-50 rounded-full text-xs font-medium text-primary-700 border border-primary-100"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience; 