import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiMenu, FiX, FiHome, FiBriefcase, FiFolder, FiAward, FiMail } from 'react-icons/fi';
import { personalInfo } from '../data/personalInfo';
import ThemeToggle from './ThemeToggle';

interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  scrolled: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ activeSection, setActiveSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home', icon: FiHome },
    { name: 'Skills', href: '#skills', icon: FiBriefcase },
    { name: 'Projects', href: '#projects', icon: FiFolder },
    { name: 'Achievements', href: '#achievements', icon: FiAward },
    { name: 'Contact', href: '#contact', icon: FiMail },
  ];

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 w-full z-50 transition-all duration-300"
      style={{
        backgroundColor: 'var(--notion-default-bg)',
        borderBottom: `1px solid var(--notion-gray-text)`,
        boxShadow: scrolled 
          ? '0 4px 20px rgba(0, 0, 0, 0.1)' 
          : '0 2px 10px rgba(0, 0, 0, 0.05)'
      }}
    >
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.a 
            href="#home" 
            className="flex items-center group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-xl font-bold" style={{ color: 'var(--notion-default-text)' }}>
              {personalInfo.name}
            </span>
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center">
            <div className="flex items-center space-x-1 p-1 rounded-xl" style={{
              backgroundColor: 'var(--notion-gray-bg)',
              border: `1px solid var(--notion-gray-text)`
            }}>
              {navLinks.map((link, index) => {
                const Icon = link.icon;
                const isActive = activeSection === link.href.substring(1);
                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    className="relative flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                    style={{
                      backgroundColor: isActive ? 'var(--notion-blue-text)' : 'transparent',
                      color: isActive ? 'white' : 'var(--notion-gray-text)'
                    }}
                    onClick={() => setActiveSection(link.href.substring(1))}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Icon size={16} />
                    <span className="hidden lg:block">{link.name}</span>
                  </motion.a>
                );
              })}
            </div>
            
            <div className="ml-4">
              <ThemeToggle />
            </div>
          </nav>

          {/* Mobile Menu Button and Theme Toggle */}
          <div className="flex md:hidden items-center space-x-3">
            <ThemeToggle />
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg transition-all duration-200"
              style={{
                backgroundColor: 'var(--notion-gray-bg)',
                border: `1px solid var(--notion-gray-text)`
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ rotate: isMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {isMenuOpen ? (
                  <FiX size={18} style={{ color: 'var(--notion-default-text)' }} />
                ) : (
                  <FiMenu size={18} style={{ color: 'var(--notion-default-text)' }} />
                )}
              </motion.div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: isMenuOpen ? 1 : 0, 
          height: isMenuOpen ? 'auto' : 0 
        }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        className="md:hidden absolute top-full left-0 w-full overflow-hidden"
        style={{
          backgroundColor: 'var(--notion-default-bg)',
          borderBottom: `1px solid var(--notion-gray-text)`
        }}
      >
        <nav className="max-w-6xl mx-auto px-4 py-4">
          <div className="space-y-1">
            {navLinks.map((link, index) => {
              const Icon = link.icon;
              const isActive = activeSection === link.href.substring(1);
              return (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-all duration-200"
                  style={{
                    backgroundColor: isActive ? 'var(--notion-blue-text)' : 'var(--notion-gray-bg)',
                    color: isActive ? 'white' : 'var(--notion-default-text)',
                    border: `1px solid ${isActive ? 'var(--notion-blue-text)' : 'var(--notion-gray-text)'}`
                  }}
                  onClick={() => {
                    setActiveSection(link.href.substring(1));
                    setIsMenuOpen(false);
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <Icon size={18} />
                  <span>{link.name}</span>
                </motion.a>
              );
            })}
          </div>
        </nav>
      </motion.div>
    </motion.header>
  );
};

export default Navbar;