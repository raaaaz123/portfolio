import { motion } from 'framer-motion';
import { FiBookOpen, FiCalendar, FiMapPin } from 'react-icons/fi';
import { education } from '../data/education';

const Education = () => {
  return (
    <section id="education" className="py-20 bg-primary-50">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl font-bold text-center mb-16"
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
              className={`relative mb-16 last:mb-0 ${
                index % 2 === 0 ? 'md:ml-auto md:mr-0' : 'md:mr-auto md:ml-0'
              } md:w-4/5`}
            >
              {/* Decorative elements */}
              <div className="absolute left-0 top-0 w-1 h-full bg-primary rounded-full hidden md:block"></div>
              <div className="absolute left-0 top-0 w-3 h-3 bg-primary rounded-full transform -translate-x-1 hidden md:block"></div>
              <div className="absolute left-0 bottom-0 w-3 h-3 bg-primary rounded-full transform -translate-x-1 hidden md:block"></div>
              
              <div className="ml-6 md:ml-10">
                <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-primary">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <motion.h3 
                      className="text-2xl font-bold text-gray-900"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: (index * 0.2) + 0.3 }}
                    >
                      {item.degree}
                    </motion.h3>
                    
                    <motion.div
                      className="flex items-center mt-2 md:mt-0"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: (index * 0.2) + 0.4 }}
                    >
                      <FiCalendar className="text-primary mr-2" />
                      <span className="text-gray-600 font-medium">{item.period}</span>
                    </motion.div>
                  </div>
                  
                  <motion.div 
                    className="flex items-center mb-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: (index * 0.2) + 0.5 }}
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                      <FiMapPin className="text-primary" size={24} />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-800">{item.institution}</h4>
                    </div>
                  </motion.div>
                  
                  {item.description && (
                    <motion.p 
                      className="text-gray-700 bg-primary-50 p-4 rounded-md border-l-2 border-primary/30"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: (index * 0.2) + 0.6 }}
                    >
                      {item.description}
                    </motion.p>
                  )}
                  
                  <motion.div 
                    className="mt-6 flex justify-end"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: (index * 0.2) + 0.7 }}
                  >
                    <div className="flex items-center">
                      <FiBookOpen className="text-primary mr-2" size={18} />
                      <span className="text-sm font-medium text-primary">Education</span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* Decorative Background Elements */}
          <div className="absolute top-1/4 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10"></div>
        </div>
      </div>
    </section>
  );
};

export default Education; 