import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiGithub, FiLinkedin, FiPhone, FiMessageCircle } from 'react-icons/fi';
import { personalInfo } from '../data/personalInfo';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(false);
    setSubmitError('');

    try {
      // In a real application, you would send the form data to your server
      // await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setSubmitError('There was an error submitting your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactLinks = [
    { 
      name: 'Email', 
      icon: <FiMail size={20} />, 
      href: `mailto:${personalInfo.email}`,
      label: personalInfo.email,
      color: 'bg-primary/10',
      iconColor: 'text-primary'
    },
    { 
      name: 'Phone', 
      icon: <FiPhone size={20} />, 
      href: personalInfo.socialLinks.phone,
      label: personalInfo.phone,
      color: 'bg-green-500/10',
      iconColor: 'text-green-500'
    },
    { 
      name: 'WhatsApp', 
      icon: <FiMessageCircle size={20} />, 
      href: personalInfo.socialLinks.whatsapp,
      label: 'Chat on WhatsApp',
      color: 'bg-emerald-500/10',
      iconColor: 'text-emerald-500'
    },
    { 
      name: 'GitHub', 
      icon: <FiGithub size={20} />, 
      href: personalInfo.socialLinks.github,
      label: 'GitHub Profile',
      color: 'bg-gray-800/10',
      iconColor: 'text-gray-800'
    },
    { 
      name: 'LinkedIn', 
      icon: <FiLinkedin size={20} />, 
      href: personalInfo.socialLinks.linkedin,
      label: 'LinkedIn Profile',
      color: 'bg-blue-600/10',
      iconColor: 'text-blue-600'
    },
  ];

  return (
    <section id="contact" className="py-16 sm:py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl font-bold text-center mb-8 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Get In Touch
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="order-2 md:order-1"
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Contact Information</h3>
            <p className="text-gray-700 mb-6 sm:mb-8 text-sm sm:text-base">
              Feel free to reach out if you want to collaborate with me, or simply have a chat.
              I'm always open to discussing new projects, creative ideas or opportunities.
            </p>

            <div className="space-y-4 sm:space-y-6">
              {contactLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center group hover:bg-primary-50 p-2 rounded-lg transition-colors"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                >
                  <div className={`w-9 h-9 sm:w-10 sm:h-10 ${link.color} rounded-full flex items-center justify-center mr-3 sm:mr-4 group-hover:scale-110 transition-transform`}>
                    <span className={link.iconColor}>{link.icon}</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm sm:text-base">{link.name}</h4>
                    <p className="text-gray-600 text-xs sm:text-sm">{link.label}</p>
                  </div>
                </motion.a>
              ))}
            </div>
            
            <div className="mt-8 pt-8 border-t border-primary-100">
              <div className="flex items-center justify-center md:justify-start gap-4">
                <a 
                  href={personalInfo.socialLinks.phone} 
                  className="px-6 py-2.5 bg-green-500 text-white rounded-full font-medium hover:bg-green-600 transition-colors flex items-center gap-2 shadow-sm"
                >
                  <FiPhone size={16} />
                  <span>Call Now</span>
                </a>
                <a 
                  href={personalInfo.socialLinks.whatsapp} 
                  className="px-6 py-2.5 bg-emerald-500 text-white rounded-full font-medium hover:bg-emerald-600 transition-colors flex items-center gap-2 shadow-sm"
                >
                  <FiMessageCircle size={16} />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="order-1 md:order-2"
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Send Me a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                ></textarea>
              </div>

              {submitError && (
                <div className="p-3 sm:p-4 bg-red-50 text-red-700 rounded-md text-sm">
                  {submitError}
                </div>
              )}

              {submitSuccess && (
                <div className="p-3 sm:p-4 bg-primary-50 text-primary-700 rounded-md text-sm">
                  Your message has been sent successfully! I'll get back to you soon.
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full flex items-center justify-center text-sm sm:text-base"
              >
                {isSubmitting ? (
                  <span className="inline-flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <span>Send Message</span>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 