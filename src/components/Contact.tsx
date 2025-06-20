import { motion } from 'framer-motion';
import { FiMail, FiGithub, FiLinkedin, FiPhone, FiMessageCircle, FiExternalLink } from 'react-icons/fi';
import { personalInfo } from '../data/personalInfo';

const Contact = () => {
  const contactLinks = [
    { 
      name: 'Email', 
      icon: <FiMail size={24} />, 
      href: `mailto:${personalInfo.email}`,
      label: personalInfo.email,
      color: 'bg-primary/10',
      iconColor: 'text-primary',
      description: 'Send me an email for business inquiries or project discussions.'
    },
    { 
      name: 'Phone', 
      icon: <FiPhone size={24} />, 
      href: personalInfo.socialLinks.phone,
      label: personalInfo.phone,
      color: 'bg-primary/10',
      iconColor: 'text-primary',
      description: 'Call me directly for urgent matters or quick consultations.'
    },
    { 
      name: 'WhatsApp', 
      icon: <FiMessageCircle size={24} />, 
      href: personalInfo.socialLinks.whatsapp,
      label: 'Chat on WhatsApp',
      color: 'bg-primary/10',
      iconColor: 'text-primary',
      description: 'Message me on WhatsApp for faster responses and casual discussions.'
    },
    { 
      name: 'GitHub', 
      icon: <FiGithub size={24} />, 
      href: personalInfo.socialLinks.github,
      label: 'GitHub Profile',
      color: 'bg-primary/10',
      iconColor: 'text-primary',
      description: 'Check out my open source projects and code repositories.'
    },
    { 
      name: 'LinkedIn', 
      icon: <FiLinkedin size={24} />, 
      href: personalInfo.socialLinks.linkedin,
      label: 'LinkedIn Profile',
      color: 'bg-primary/10',
      iconColor: 'text-primary',
      description: 'Connect with me professionally and view my work experience.'
    },
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-primary-50 to-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-0 left-0 w-64 h-64 bg-primary-100/30 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div 
          className="absolute bottom-0 right-0 w-80 h-80 bg-primary-100/40 rounded-full blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, -20, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white border border-primary-200 rounded-full text-primary-700 text-sm font-medium shadow-sm"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <FiMail className="w-4 h-4 text-primary" />
            Contact Me
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Feel free to reach out if you want to collaborate with me, discuss new projects,
            or simply have a chat about technology and innovation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {contactLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(249, 115, 22, 0.1)",
              }}
              className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-primary-100 shadow-sm flex flex-col h-full group"
            >
              <div className="flex items-center mb-4">
                <div className={`w-12 h-12 ${link.color} rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform`}>
                  <span className={link.iconColor}>{link.icon}</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-800">{link.name}</h3>
                  <p className="text-primary-600 text-sm font-medium">{link.label}</p>
                </div>
              </div>
              
              <p className="text-gray-600 mt-2 mb-4 text-sm flex-grow">
                {link.description}
              </p>
              
              <div className="flex items-center text-primary font-medium text-sm mt-auto group-hover:text-primary-600 transition-colors">
                <span>Connect</span>
                <FiExternalLink className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600 mb-6">
            Prefer a direct approach? Reach out now.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.a 
              href={`mailto:${personalInfo.email}`}
              className="px-6 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary-600 transition-colors flex items-center gap-2 shadow-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiMail size={18} />
              <span>Send Email</span>
            </motion.a>
            <motion.a 
              href={personalInfo.socialLinks.whatsapp}
              className="px-6 py-3 bg-white border border-primary text-primary rounded-full font-medium hover:bg-primary-50 transition-colors flex items-center gap-2 shadow-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiMessageCircle size={18} />
              <span>WhatsApp</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact; 