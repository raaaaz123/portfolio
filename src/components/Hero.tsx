import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiArrowDown, FiCode, FiServer, FiCloud, FiLayers, FiBriefcase } from 'react-icons/fi';
import { personalInfo } from '../data/personalInfo';
import useAnalytics from '../hooks/usePostHog';

interface TypewriterTextProps {
  texts: string[];
  className: string;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ texts, className }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const fullText = texts[currentIndex];

      if (!isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        if (currentText === fullText) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentIndex, texts]);

  return (
    <span className={className}>
      {currentText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
        className="ml-1 text-primary"
      >
        |
      </motion.span>
    </span>
  );
};



const Hero = () => {
  const { trackEvent } = useAnalytics();

  const rotatingTexts = ["AI Solutions", "SaaS Platforms", "Mobile Apps", "RAG Systems"];

  const socialLinks = [
    { name: 'GitHub', icon: <FiGithub size={20} />, href: personalInfo.socialLinks.github },
    { name: 'LinkedIn', icon: <FiLinkedin size={20} />, href: personalInfo.socialLinks.linkedin },
    { name: 'Email', icon: <FiMail size={20} />, href: personalInfo.socialLinks.email },
  ];

  const expertiseIcons = [
    <FiCode key="code" size={20} />,
    <FiServer key="server" size={20} />,
    <FiCloud key="cloud" size={20} />,
    <FiLayers key="layers" size={20} />
  ];

  const handleSocialClick = (platform: string) => {
    trackEvent('social_link_click', { platform });
  };

  const handleResumeClick = () => {
    trackEvent('resume_view');
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 sm:pt-24 md:pt-16 bg-background text-foreground"
    >
      <div className="container mx-auto px-4 py-8 md:py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
          {/* Main Content */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Open to Work Status */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
              className="mb-6 relative"
            >
              <div className="flex items-center gap-3 shadow-sm rounded-full px-5 py-2 relative bg-secondary border border-border">
                <div className="w-3 h-3 rounded-full shadow-lg shadow-green-500/50 animate-pulse bg-green-500"></div>
                <span className="font-medium text-sm text-secondary-foreground">Open to Work</span>
                <FiBriefcase className="text-muted-foreground" size={16} />
              </div>
            </motion.div>

            {/* Title Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-4"
            >
              <span className="inline-block px-6 py-2 rounded-full text-sm font-semibold shadow-sm bg-secondary text-secondary-foreground border border-border">
                {personalInfo.title}
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight tracking-tight text-foreground"
            >
              Hi, I'm <span className="text-foreground">{personalInfo.name}</span>
              <span className="text-muted-foreground">.</span>
            </motion.h1>

            {/* Dynamic Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl sm:text-2xl md:text-3xl mb-6 text-muted-foreground"
            >
              <span>I build </span>
              <span className="font-bold text-foreground">
                <TypewriterText
                  texts={rotatingTexts}
                  className=""
                />
              </span>
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg mb-8 max-w-2xl leading-relaxed text-muted-foreground"
            >
              {personalInfo.bio.split('.').slice(0, 2).join('.') + '.'}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 mb-8 w-full sm:w-auto"
            >
              <motion.a
                href={personalInfo.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleResumeClick}
                className="px-8 py-3 rounded-full font-semibold text-center shadow-lg hover:shadow-xl transition-all duration-300 bg-primary text-primary-foreground hover:bg-primary/90"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                View Resume
              </motion.a>

              <motion.a
                href="#contact"
                className="px-8 py-3 rounded-full font-semibold text-center hover:shadow-lg transition-all duration-300 bg-background text-foreground border-2 border-input hover:bg-secondary/50"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Me
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex items-center space-x-4"
            >
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleSocialClick(link.name.toLowerCase())}
                  className="transition-colors p-3 rounded-full flex items-center justify-center w-12 h-12 shadow-sm hover:shadow-md bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80 border border-border"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  aria-label={link.name}
                >
                  {link.icon}
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Expertise Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="lg:col-span-5 p-8 rounded-3xl shadow-xl relative overflow-hidden bg-white dark:bg-zinc-900 border border-border"
          >
            <motion.div
              className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-2xl opacity-50 bg-secondary"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 45, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <div className="relative z-10">
              <motion.h3
                className="text-2xl font-bold mb-6 text-foreground"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                Expertise
              </motion.h3>

              <div className="space-y-4">
                {personalInfo.expertise.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.9 + (index * 0.1) }}
                    className="flex items-center gap-4 group"
                  >
                    <motion.div
                      className="flex items-center justify-center p-2 rounded-xl bg-secondary border border-border"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <div className="text-muted-foreground group-hover:text-primary transition-colors">
                        {expertiseIcons[index % expertiseIcons.length]}
                      </div>
                    </motion.div>
                    <div>
                      <motion.p
                        className="font-semibold transition-colors text-foreground group-hover:translate-x-1"
                        whileHover={{ x: 5 }}
                      >
                        {item}
                      </motion.p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <h4 className="text-lg font-semibold mb-4 text-foreground">Interests</h4>
                <div className="flex flex-wrap gap-2">
                  {personalInfo.interests.slice(0, 5).map((interest, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.2 + index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="text-sm px-3 py-1.5 rounded-full hover:shadow-sm transition-all cursor-default font-medium bg-secondary text-muted-foreground border border-border"
                    >
                      {interest}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden sm:block"
      >
        <motion.a
          href="#about"
          aria-label="Scroll down"
          className="flex flex-col items-center gap-2 p-3 rounded-full hover:shadow-lg transition-all group bg-background border border-border"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          whileHover={{ scale: 1.1 }}
        >
          <FiArrowDown className="transition-colors text-muted-foreground group-hover:text-primary" size={18} />
          <span className="text-xs font-medium text-muted-foreground group-hover:text-primary">Scroll</span>
        </motion.a>
      </motion.div>
    </section>
  );
};

export default Hero;