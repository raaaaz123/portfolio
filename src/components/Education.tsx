import { motion } from 'framer-motion';
import { FiBookOpen, FiCalendar, FiMapPin } from 'react-icons/fi';
import { education } from '../data/education';

const Education = () => {
  return (
    <section id="education" className="py-20 bg-secondary/30 text-foreground">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl font-bold text-center mb-16 text-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Education
        </motion.h2>

        <div className="max-w-5xl mx-auto">
          {education.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: index * 0.2,
                type: "spring",
                stiffness: 100
              }}
              className={`relative mb-8 sm:mb-16 last:mb-0 ${index % 2 === 0 ? 'md:ml-auto md:mr-0' : 'md:mr-auto md:ml-0'
                } w-full md:w-4/5`}
            >
              {/* Decorative elements */}
              <div className="absolute left-0 top-0 w-1 h-full rounded-full hidden md:block bg-border"></div>
              <div className="absolute left-0 top-0 w-3 h-3 rounded-full transform -translate-x-1 hidden md:block bg-primary"></div>
              <div className="absolute left-0 bottom-0 w-3 h-3 rounded-full transform -translate-x-1 hidden md:block bg-primary"></div>

              <div className="ml-0 md:ml-10">
                <div className="p-4 sm:p-6 md:p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card border-l-4 border-primary">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3 sm:mb-4">
                    <motion.h3
                      className="text-xl sm:text-2xl font-bold text-foreground"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: (index * 0.2) + 0.3 }}
                    >
                      {item.degree}
                    </motion.h3>

                    <motion.div
                      className="flex items-center mt-1 md:mt-0"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: (index * 0.2) + 0.4 }}
                    >
                      <FiCalendar className="mr-2 text-muted-foreground" size={14} />
                      <span className="text-sm sm:text-base font-medium text-muted-foreground">{item.period}</span>
                    </motion.div>
                  </div>

                  <motion.div
                    className="flex items-center mb-3 sm:mb-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: (index * 0.2) + 0.5 }}
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mr-3 sm:mr-4 bg-secondary text-foreground">
                      <FiMapPin className="text-muted-foreground" size={20} />
                    </div>
                    <div>
                      <h4 className="text-lg sm:text-xl font-semibold text-foreground">{item.institution}</h4>
                    </div>
                  </motion.div>

                  {item.description && (
                    <motion.p
                      className="text-sm sm:text-base p-3 sm:p-4 rounded-md bg-secondary/50 text-muted-foreground border-l-2 border-border"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: (index * 0.2) + 0.6 }}
                    >
                      {item.description}
                    </motion.p>
                  )}

                  <motion.div
                    className="mt-4 sm:mt-6 flex justify-end"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: (index * 0.2) + 0.7 }}
                  >
                    <div className="flex items-center">
                      <FiBookOpen className="mr-2 text-primary" size={16} />
                      <span className="text-xs sm:text-sm font-medium text-muted-foreground">Education</span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Decorative Background Elements */}
          <div className="absolute top-1/4 right-0 w-64 h-64 rounded-full blur-3xl -z-10 bg-primary/5"></div>
          <div className="absolute bottom-1/4 left-0 w-96 h-96 rounded-full blur-3xl -z-10 bg-primary/5"></div>
        </div>
      </div>
    </section>
  );
};

export default Education;