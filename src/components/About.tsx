import { motion } from 'framer-motion';
import { FiCode, FiCpu, FiServer, FiDatabase, FiDownload, FiStar } from 'react-icons/fi';
import { personalInfo } from '../data/personalInfo';

const About = () => {
  const expertiseAreas = [
    {
      title: 'AI-Powered Development',
      icon: <FiCpu className="w-6 h-6" />,
      description: 'Building smarter apps faster using AI pair programming with Cursor IDE, Claude, and GPT-4. Shipping features 3x faster with AI-assisted development.',
      gradient: 'from-primary-500 to-primary-600',
    },
    {
      title: 'SaaS Products',
      icon: <FiCode className="w-6 h-6" />,
      description: 'Created MakeMyFlyer.com and Snapzy Web - profitable SaaS platforms that help businesses automate design and social media management.',
      gradient: 'from-primary-500 to-primary-600',
    },
    {
      title: 'Full-Stack Apps',
      icon: <FiServer className="w-6 h-6" />,
      description: 'Building complete solutions with Next.js, React, TypeScript, and Node.js. Focus on clean code and fast shipping.',
      gradient: 'from-primary-500 to-primary-600',
    },
    {
      title: 'AI Integrations',
      icon: <FiDatabase className="w-6 h-6" />,
      description: 'Integrating Claude, GPT-4, and Vertex AI to create smart features like automated content generation and intelligent automation.',
      gradient: 'from-primary-500 to-primary-600',
    },
  ];

  const highlights = [
    "Solo Full-Stack Developer",
    "AI-First Builder",
    "SaaS Founder",
    "Automation Expert"
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <section id="about" className="relative min-h-screen py-20 overflow-hidden bg-primary-50">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23f97316\' fill-opacity=\'0.05\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'1\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
      </div>

      {/* Subtle floating elements */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-primary-100/40 to-primary-200/40 rounded-full blur-xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }} />
      <motion.div
        className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-gray-200/40 to-primary-100/40 rounded-full blur-xl"
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
          scale: [1, 0.8, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }} />
      <motion.div
        className="absolute top-1/2 left-1/2 w-24 h-24 bg-gradient-to-r from-primary-100/40 to-primary-200/40 rounded-full blur-lg transform -translate-x-1/2 -translate-y-1/2"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }} />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white border border-primary-200 rounded-full text-primary-700 text-sm font-medium shadow-sm"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <FiStar className="w-4 h-4 text-primary" />
            About Me
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
          Engineering the Future
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full shadow-sm"></div>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Bio Section */}
          <motion.div
            className="mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              className="bg-white border border-primary-100 rounded-3xl p-8 md:p-12 shadow-md text-center"
              variants={itemVariants}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 25px 50px -12px rgba(249, 115, 22, 0.1)"
              }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-8 font-light">
                Hey! I'm a solo developer who builds and ships profitable SaaS products. I use AI tools like Claude and GPT-4 to code faster and smarter. My apps MakeMyFlyer.com and Bioly.link help businesses automate their work and are already making money. I love using AI not just in my products, but also in my development process - it helps me ship features 3x faster. Whether it's automating design work or making social media management easier, I focus on building tools that solve real problems.
              </p>

              <div className="flex flex-wrap justify-center gap-3 mb-10">
                {highlights.map((highlight, index) => (
                  <motion.span
                    key={index}
                    className="px-6 py-3 bg-primary-50 border border-primary-200 text-primary-700 rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-all duration-300"
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "rgba(254, 215, 170, 1)"
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {highlight}
                  </motion.span>
                ))}
              </div>

              <motion.div
                className="flex justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a
                  href={personalInfo.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex items-center gap-3"
                >
                  <FiDownload className="w-5 h-5 group-hover:animate-bounce" />
                  Download Resume
                </a>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Expertise Areas */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {expertiseAreas.map((area, index) => (
              <motion.div
                key={index}
                className="group bg-white border border-primary-100 rounded-2xl p-6 lg:p-8 shadow-sm hover:shadow-md transition-all duration-500"
                variants={itemVariants}
                whileHover={{
                  scale: 1.03,
                  y: -5,
                  boxShadow: "0 25px 50px -12px rgba(249, 115, 22, 0.1)"
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center mb-6">
                  <motion.div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-r ${area.gradient} flex items-center justify-center mr-4 shadow-sm text-white group-hover:scale-110 transition-transform duration-300`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    {area.icon}
                  </motion.div>
                  <h4 className="font-bold text-gray-800 text-lg lg:text-xl group-hover:text-primary transition-all duration-300">
                    {area.title}
                  </h4>
                </div>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  {area.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary-50 to-transparent pointer-events-none"></div>
    </section>
  );
};

export default About;