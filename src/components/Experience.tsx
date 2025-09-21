import { motion } from 'framer-motion';
import { experiences } from '../data/experience';
import { FiBriefcase, FiExternalLink } from 'react-icons/fi';

const Experience = () => {
  return (
    <section id="experience" className="py-20" style={{ backgroundColor: 'var(--notion-default-bg)' }}>
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--notion-default-text)' }}>
            Experience
          </h2>
          <div className="w-20 h-1 mx-auto rounded-full mb-4" style={{ backgroundColor: 'var(--notion-gray-text)' }} />
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
                  <div className="p-4 rounded-xl shadow-sm h-full" style={{ backgroundColor: 'var(--notion-default-bg)', border: `1px solid var(--notion-gray-text)` }}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--notion-gray-text)' }}></span>
                      <span className="text-sm font-medium" style={{ color: 'var(--notion-gray-text)' }}>{experience.period}</span>
                    </div>
                    <h3 className="text-lg font-bold" style={{ color: 'var(--notion-default-text)' }}>{experience.title}</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <FiBriefcase style={{ color: 'var(--notion-gray-text)' }} size={14} />
                      <span className="text-sm" style={{ color: 'var(--notion-gray-text)' }}>{experience.company}</span>
                    </div>
                    {experience.type && (
                      <div className="mt-2">
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'var(--notion-gray-bg)', color: 'var(--notion-gray-text)', border: `1px solid var(--notion-gray-text)` }}>
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
                            className="flex items-center gap-2 transition-colors text-sm font-medium"
                            style={{ color: 'var(--notion-gray-text)' }}
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
                  <div className="p-5 rounded-xl shadow-sm h-full" style={{ backgroundColor: 'var(--notion-default-bg)', border: `1px solid var(--notion-gray-text)` }}>
                    {/* Connector line (visible only on desktop) */}
                    <div className="absolute left-0 top-1/2 transform -translate-x-full -translate-y-1/2 w-8 h-px hidden md:block" style={{ backgroundColor: 'var(--notion-gray-text)' }}></div>
                    
                    <ul className="space-y-2 mb-4">
                      {experience.description.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <span className="mr-2 mt-1" style={{ color: 'var(--notion-gray-text)' }}>•</span>
                          <span style={{ color: 'var(--notion-gray-text)' }}>{item}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="flex flex-wrap gap-2 mt-4">
                      {experience.technologies?.map((tech, i) => (
                        <span 
                          key={i}
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