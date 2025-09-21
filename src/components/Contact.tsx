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
    <section id="contact" className="py-20 relative overflow-hidden" style={{ backgroundColor: 'var(--notion-gray-bg)' }}>
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-0 left-0 w-64 h-64 rounded-full blur-3xl"
          style={{ backgroundColor: 'var(--notion-gray-text)', opacity: 0.1 }}
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
          className="absolute bottom-0 right-0 w-80 h-80 rounded-full blur-3xl"
          style={{ backgroundColor: 'var(--notion-gray-text)', opacity: 0.15 }}
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
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full text-sm font-medium shadow-sm"
            style={{
              backgroundColor: 'var(--notion-default-bg)',
              border: `1px solid var(--notion-gray-text)`,
              color: 'var(--notion-gray-text)'
            }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <FiMail className="w-4 h-4" style={{ color: 'var(--notion-gray-text)' }} />
            Contact Me
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--notion-default-text)' }}>
            Get In Touch
          </h2>
          <div className="w-16 h-0.5 mx-auto rounded-full mb-6" style={{ backgroundColor: 'var(--notion-gray-text)' }}></div>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--notion-gray-text)' }}>
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
              className="backdrop-blur-sm rounded-2xl p-6 hover:shadow-xl transition-all duration-300 group"
              style={{
                backgroundColor: 'var(--notion-default-bg)',
                border: `1px solid var(--notion-gray-text)`,
                opacity: 0.95
              }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mr-4 transition-all duration-300 group-hover:scale-110" style={{ backgroundColor: 'var(--notion-gray-bg)' }}>
                  <span style={{ color: 'var(--notion-gray-text)' }}>{link.icon}</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg" style={{ color: 'var(--notion-default-text)' }}>{link.name}</h3>
                  <p className="text-sm font-medium" style={{ color: 'var(--notion-gray-text)' }}>{link.label}</p>
                </div>
              </div>
              
              <p className="mt-2 mb-4 text-sm flex-grow" style={{ color: 'var(--notion-gray-text)' }}>
                {link.description}
              </p>
              
              <div className="flex items-center font-medium text-sm mt-auto transition-colors" style={{ color: 'var(--notion-gray-text)' }}>
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
          <p className="mb-6" style={{ color: 'var(--notion-gray-text)' }}>
            Prefer a direct approach? Reach out now.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.a 
              href={`mailto:${personalInfo.email}`}
              className="w-full font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
              style={{
                backgroundColor: 'var(--notion-gray-bg)',
                color: 'var(--notion-default-text)',
                border: `1px solid var(--notion-gray-text)`
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiMail size={18} />
              <span>Send Email</span>
            </motion.a>
            <motion.a 
              href={personalInfo.socialLinks.whatsapp}
              className="w-full px-4 py-3 rounded-lg focus:outline-none transition-all duration-200 resize-none flex items-center justify-center gap-2"
              style={{
                backgroundColor: 'var(--notion-gray-bg)',
                border: `1px solid var(--notion-gray-text)`,
                color: 'var(--notion-gray-text)'
              }}
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