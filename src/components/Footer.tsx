import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiHeart, FiArrowUp } from 'react-icons/fi';
import { personalInfo } from '../data/personalInfo';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'GitHub', icon: <FiGithub size={18} />, href: personalInfo.socialLinks.github },
    { name: 'LinkedIn', icon: <FiLinkedin size={18} />, href: personalInfo.socialLinks.linkedin },
    { name: 'Email', icon: <FiMail size={18} />, href: personalInfo.socialLinks.email },
  ];

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="py-12 relative overflow-hidden bg-background border-t border-border text-foreground">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 sm:mb-8">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <a href="#home" className="text-lg sm:text-xl font-bold text-foreground">
              {personalInfo.name.split(' ')[0]}
              <span className="text-primary">.</span>
            </a>
            <p className="mt-2 max-w-md text-sm sm:text-base text-muted-foreground">
              {personalInfo.tagline}
            </p>
          </div>

          <div className="flex space-x-4 sm:space-x-6 mb-4 md:mb-0">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-200 p-1 text-muted-foreground hover:text-foreground"
                aria-label={link.name}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="border-t border-border pt-6 sm:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <nav className="flex flex-wrap justify-center gap-x-4 sm:gap-x-6 gap-y-2 mb-4 md:mb-0">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="transition-colors duration-200 text-xs sm:text-sm text-muted-foreground hover:text-foreground"
                >
                  {link.name}
                </a>
              ))}
            </nav>
            <div className="flex items-center text-xs sm:text-sm text-center md:text-right text-muted-foreground">
              <p>
                © {currentYear} <FiHeart className="inline mx-1 text-red-500" /> by {personalInfo.name}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Back to top button */}
      <motion.a
        href="#home"
        className="fixed bottom-6 right-6 p-3 rounded-full shadow-lg transition-colors z-50 bg-primary text-primary-foreground hover:bg-primary/90"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        aria-label="Back to top"
      >
        <FiArrowUp size={20} />
      </motion.a>
    </footer>
  );
};

export default Footer;