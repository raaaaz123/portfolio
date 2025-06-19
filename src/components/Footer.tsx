import { FiGithub, FiLinkedin, FiMail, FiHeart } from 'react-icons/fi';
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
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="bg-white py-8 sm:py-12 border-t border-primary-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 sm:mb-8">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <a href="#home" className="text-lg sm:text-xl font-bold text-gray-900">
              {personalInfo.name.split(' ')[0]}
              <span className="text-primary">.</span>
            </a>
            <p className="mt-2 text-gray-600 max-w-md text-sm sm:text-base">
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
                className="text-gray-600 hover:text-primary transition-colors p-1"
                aria-label={link.name}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="border-t border-primary-100 pt-6 sm:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <nav className="flex flex-wrap justify-center gap-x-4 sm:gap-x-6 gap-y-2 mb-4 md:mb-0">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-600 hover:text-primary transition-colors text-xs sm:text-sm"
                >
                  {link.name}
                </a>
              ))}
            </nav>
            <div className="flex items-center text-gray-600 text-xs sm:text-sm text-center md:text-right">
              <p>
                Built with <FiHeart className="inline text-primary mx-1" /> by {personalInfo.name} using React, TypeScript & Tailwind
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 