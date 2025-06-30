import { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiArrowDown, FiCode, FiServer, FiCloud, FiLayers, FiBriefcase, FiTerminal, FiDatabase, FiCpu, FiHardDrive } from 'react-icons/fi';
import { personalInfo } from '../data/personalInfo';
import useAnalytics from '../hooks/usePostHog';
import { colors } from '../data/colors';

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
        className="ml-1"
      >
        |
      </motion.span>
    </span>
  );
};

const BinaryRain = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-primary-300/20 font-mono text-xs"
          style={{
            left: `${Math.random() * 100}%`,
            top: '-5%',
          }}
          animate={{
            y: ['0vh', '105vh'],
          }}
          transition={{
            duration: 6 + Math.random() * 8,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear",
          }}
        >
          {Array.from({ length: 10 }, () => Math.round(Math.random())).join('')}
        </motion.div>
      ))}
    </div>
  );
};

const FloatingIcons = () => {
  const icons = [
    { Icon: FiCode, delay: 0 },
    { Icon: FiDatabase, delay: 0.5 },
    { Icon: FiServer, delay: 1 },
    { Icon: FiCpu, delay: 1.5 },
    { Icon: FiCloud, delay: 2 },
    { Icon: FiHardDrive, delay: 2.5 },
    { Icon: FiTerminal, delay: 3 },
    { Icon: FiLayers, delay: 3.5 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {icons.map(({ Icon, delay }, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{
            left: `${10 + (index * 12)}%`,
            top: `${20 + Math.sin(index) * 30}%`,
          }}
          initial={{ opacity: 0, y: 100, rotate: -180 }}
          animate={{ 
            opacity: [0, 0.6, 0],
            y: [-100, -200, -300],
            rotate: [0, 180, 360],
            scale: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 16,
            delay: delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Icon size={24} className="text-primary-400/60" />
        </motion.div>
      ))}
    </div>
  );
};

const ParticleField = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary-300/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, -200],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 6 + Math.random() * 8,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
};

const GridPattern = () => (
  <div className="absolute inset-0 opacity-10">
    <div className="absolute inset-0" style={{
      backgroundImage: `
        linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
      `,
      backgroundSize: '50px 50px'
    }} />
  </div>
);

const CircuitPattern = () => (
  <div className="absolute inset-0 opacity-5">
    <svg className="w-full h-full" viewBox="0 0 1000 1000">
      <defs>
        <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          <path d="M20 20h60v60h-60z" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="20" cy="20" r="2" fill="currentColor" />
          <circle cx="80" cy="20" r="2" fill="currentColor" />
          <circle cx="20" cy="80" r="2" fill="currentColor" />
          <circle cx="80" cy="80" r="2" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#circuit)" className="text-primary-400" />
    </svg>
  </div>
);

const Hero = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const { trackEvent } = useAnalytics();

  const rotateX = useTransform(mouseY, [-300, 300], [5, -5]);
  const rotateY = useTransform(mouseX, [-300, 300], [-5, 5]);

  const handleMouseMove = (e: { currentTarget: { getBoundingClientRect: () => any; }; clientX: number; clientY: number; }) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const rotatingTexts = ["AI Solutions", "SaaS Platforms", "Mobile Apps", "Web Applications"];

  const socialLinks = [
    { name: 'GitHub', icon: <FiGithub size={20} />, href: personalInfo.socialLinks.github },
    { name: 'LinkedIn', icon: <FiLinkedin size={20} />, href: personalInfo.socialLinks.linkedin },
    { name: 'Email', icon: <FiMail size={20} />, href: personalInfo.socialLinks.email },
  ];

  const expertiseIcons = [
    <FiCode key="code" size={24} />,
    <FiServer key="server" size={24} />,
    <FiCloud key="cloud" size={24} />,
    <FiLayers key="layers" size={24} />
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
      className="h-screen flex items-center justify-center relative overflow-hidden pt-20 sm:pt-24 md:pt-16 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800"
      onMouseMove={handleMouseMove}
    >
      {/* Circuit board background */}
      <CircuitPattern />

      {/* Grid pattern */}
      <GridPattern />

      {/* Enhanced animated background with tech elements */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={{
          background: [
            `radial-gradient(circle at 30% 20%, ${colors.primary[500]}10 0%, ${colors.accent.blue}0D 30%, transparent 70%)`,
            `radial-gradient(circle at 70% 60%, ${colors.accent.blue}10 0%, ${colors.primary[500]}0D 40%, transparent 70%)`,
            `radial-gradient(circle at 40% 80%, ${colors.accent.green}14 0%, ${colors.accent.blue}0D 40%, transparent 70%)`,
            `radial-gradient(circle at 60% 30%, ${colors.accent.blue}10 0%, ${colors.accent.green}14 40%, transparent 70%)`,
          ]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Tech-themed geometric shapes */}
      <div className="absolute inset-0 z-10">
        <motion.div
          className={`absolute top-1/4 right-1/4 w-48 h-48 rounded-lg bg-gradient-to-r from-primary-400/10 to-accent-blue/10 blur-2xl`}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 45, 0],
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className={`absolute bottom-1/3 left-1/5 w-56 h-56 rounded-lg bg-gradient-to-r from-accent-green/10 to-primary-400/10 blur-2xl`}
          animate={{
            scale: [1, 0.8, 1],
            rotate: [0, -30, 0],
            x: [0, -20, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Hexagonal tech shapes */}
        <motion.div
          className="absolute top-1/3 left-1/4 w-24 h-24"
          animate={{
            rotate: [0, 360],
            scale: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className="w-full h-full bg-gradient-to-r from-primary-500/20 to-accent-blue/20 clip-polygon-hexagon blur-sm"></div>
        </motion.div>
      </div>

      {/* Binary rain effect */}
      <BinaryRain />

      {/* Floating tech icons */}
      <FloatingIcons />

      {/* Enhanced particle field */}
      <ParticleField />

      <div className="container mx-auto px-4 py-4 md:py-8 relative z-30">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 items-center">
          {/* Main Content */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Open to Work Status */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
              className="mt-8 sm:mt-12 md:mt-0 mb-4 relative"
            >
              <div className="flex items-center gap-3 bg-gray-800/90 backdrop-blur-sm shadow-lg border border-gray-700/50 rounded-full px-4 py-1.5 relative">
                <div className="w-3 h-3 rounded-full green-glow"></div>
                <span className="text-gray-100 font-medium text-sm">Open to Work</span>
                <FiBriefcase className="text-gray-300" size={14} />
            
              </div>
            </motion.div>

            {/* Title Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-3"
            >
              <span className="inline-block px-5 py-1.5 bg-gradient-to-r from-primary-500/20 to-accent-blue/20 backdrop-blur-sm text-primary-300 rounded-full text-xs font-medium border border-primary-400/30 shadow-lg">
                {personalInfo.title}
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3"
            >
              Hi, I'm <span className="text-primary-400">{personalInfo.name}</span>
              <span className="text-primary-400">.</span>
            </motion.h1>

            {/* Dynamic Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-5"
            >
              <span>I build </span>
              <TypewriterText
                texts={rotatingTexts}
                className="text-primary-400 font-bold"
              />
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base md:text-lg text-gray-400 mb-5 max-w-xl leading-relaxed"
            >
              {personalInfo.bio.split('.').slice(0, 2).join('.') + '.'}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-3 mb-5 w-full sm:w-auto"
            >
              <motion.a
                href={personalInfo.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleResumeClick}
                className="px-6 py-2.5 bg-primary-500 text-white rounded-full font-bold text-center shadow-lg hover:bg-primary-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Resume
              </motion.a>

              <motion.a
                href="#contact"
                className="px-6 py-2.5 bg-transparent border-2 border-gray-600 text-gray-300 rounded-full font-bold text-center hover:bg-gray-800 hover:border-gray-500 transition-all"
                whileHover={{ scale: 1.05 }}
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
                  className="text-gray-400 hover:text-primary-400 transition-colors p-2 hover:bg-gray-800 rounded-full border border-gray-700 bg-gray-800/50 backdrop-blur-sm flex items-center justify-center w-10 h-10"
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
            initial={{ opacity: 0, x: 50, rotateY: -15 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            style={{
              rotateX: rotateX,
              rotateY: rotateY,
              transformStyle: "preserve-3d",
            }}
            className="lg:col-span-5 bg-gray-800/90 backdrop-blur-sm p-5 md:p-6 rounded-2xl shadow-2xl border border-gray-700/50 relative overflow-hidden"
          >
            <motion.div
              className="absolute -top-24 -right-24 w-40 h-40 bg-gradient-to-br from-primary-500/20 to-accent-blue/20 rounded-full blur-xl"
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
                className="text-xl font-bold mb-4 text-white"
                animate={{
                  textShadow: [
                    `0 0 10px ${colors.primary[500]}4D`,
                    `0 0 20px ${colors.accent.blue}4D`,
                    `0 0 10px ${colors.primary[500]}4D`,
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Expertise
              </motion.h3>

              <div className="space-y-3">
                {personalInfo.expertise.map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 + (index * 0.1) }}
                    className="flex items-center gap-3 group"
                  >
                    <motion.div 
                      className="flex items-center justify-center p-1.5 bg-gradient-to-r from-primary-500/20 to-accent-blue/20 rounded-lg border border-primary-400/30"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <div className="text-primary-400">
                        {expertiseIcons[index % expertiseIcons.length]}
                      </div>
                    </motion.div>
                    <div>
                      <motion.p 
                        className="font-semibold text-gray-200 group-hover:text-primary-400 transition-colors text-sm"
                        whileHover={{ x: 5 }}
                      >
                        {item}
                      </motion.p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-700">
                <h4 className="text-base font-semibold text-gray-300 mb-3">Interests</h4>
                <div className="flex flex-wrap gap-2">
                  {personalInfo.interests.slice(0, 5).map((interest, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1 + index * 0.1 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="text-xs bg-gradient-to-r from-primary-500/20 to-accent-blue/20 text-primary-300 px-2.5 py-1 rounded-full border border-primary-400/30 hover:bg-primary-500/30 transition-all cursor-default"
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
        className="absolute bottom-5 left-1/2 transform -translate-x-1/2 hidden sm:block"
      >
        <motion.a
          href="#about"
          aria-label="Scroll down"
          className="flex flex-col items-center gap-1 p-2 bg-gray-800/80 backdrop-blur-sm rounded-full border border-gray-700/50 hover:bg-gray-700 transition-all group shadow-lg"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          whileHover={{ scale: 1.1 }}
        >
          <FiArrowDown className="text-gray-400 group-hover:text-primary-400 transition-colors" size={16} />
          <span className="text-xs text-gray-500 font-medium">Scroll</span>
        </motion.a>
      </motion.div>
    </section>
  );
};

export default Hero;