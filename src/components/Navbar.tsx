import { useState, useEffect } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { personalInfo } from '../data/personalInfo';

interface NavbarProps {
  scrolled: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ scrolled }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + 100; // Adding offset for navbar height

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionId = section.getAttribute('id') || '';

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50' 
          : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <a href="#home" className="flex items-center group">
          <span className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
            {personalInfo.name.split(' ')[0]}
            <span className="text-primary-600">.</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2 lg:space-x-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-sm font-medium px-4 py-2 rounded-full transition-all duration-300 ${
                activeSection === link.href.substring(1)
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/25'
                  : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'
              }`}
              onClick={() => setActiveSection(link.href.substring(1))}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-full transition-all duration-300"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden bg-white/95 backdrop-blur-md shadow-xl border-t border-gray-200/50 absolute w-full max-h-[80vh] overflow-y-auto">
          <div className="container mx-auto px-4 py-6 flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                  activeSection === link.href.substring(1)
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/25'
                    : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'
                }`}
                onClick={() => {
                  setIsMenuOpen(false);
                  setActiveSection(link.href.substring(1));
                }}
              >
                {link.name}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar; 