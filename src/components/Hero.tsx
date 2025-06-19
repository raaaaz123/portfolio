import { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
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
        className="ml-1"
      >
        |
      </motion.span>
    </span>
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
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
};

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
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 bg-gradient-to-br from-primary-50 via-white to-primary-50"
      onMouseMove={handleMouseMove}
    >
      {/* Enhanced animated background */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={{
          background: [
            'radial-gradient(circle at 30% 20%, #fff7ed 0%, #ffedd5 30%, #fff7ed 70%)',
            'radial-gradient(circle at 70% 60%, #fff7ed 0%, #fed7aa 40%, #fff7ed 70%)',
            'radial-gradient(circle at 40% 80%, #ffedd5 0%, #fff7ed 40%, #fed7aa 70%)',
            'radial-gradient(circle at 60% 30%, #fed7aa 0%, #fff7ed 40%, #ffedd5 70%)',
          ]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Animated geometric shapes */}
      <div className="absolute inset-0 z-10">
        <motion.div
          className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-primary-100/20 to-primary-200/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/5 w-72 h-72 rounded-full bg-gradient-to-r from-primary-200/10 to-primary-100/20 blur-3xl"
          animate={{
            scale: [1, 0.8, 1],
            x: [0, -20, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/3 w-48 h-48 rounded-full bg-gradient-to-r from-primary-100/30 to-primary-200/5 blur-2xl"
          animate={{
            rotate: [0, 360],
            scale: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Enhanced particle field */}
      <ParticleField />

      <div className="container mx-auto px-4 py-8 md:py-16 relative z-30">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Content - take up more space on larger screens */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Open to Work Status */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
              className="mb-6 relative"
            >
              <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm shadow-sm border border-gray-200/50 rounded-full px-4 py-2">
                <div className="relative">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <motion.div
                    className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full"
                    animate={{
                      scale: [1, 1.8, 1],
                      opacity: [1, 0, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </div>
                <span className="text-gray-700 font-medium text-sm">Open to Work</span>
                <FiBriefcase className="text-gray-500" size={16} />
              </div>
            </motion.div>

            {/* Title Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-4"
            >
              <span className="inline-block px-6 py-2 bg-primary-100/80 backdrop-blur-sm text-primary-700 rounded-full text-sm font-medium border border-primary-200/50 shadow-sm">
                {personalInfo.title}
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4"
            >
              Hi, I'm <span className="text-primary">{personalInfo.name.split(' ')[0]}</span>
              <span className="text-gray-800">.</span>
            </motion.h1>

            {/* Dynamic Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl sm:text-2xl md:text-3xl text-gray-600 mb-8"
            >
              <span>I build </span>
              <TypewriterText 
                texts={rotatingTexts}
                className="text-primary font-bold"
              />
            </motion.div>

            {/* Bio - shortened for better fit */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-gray-600 mb-8 max-w-2xl leading-relaxed"
            >
              {personalInfo.bio.split('.').slice(0, 2).join('.')+'.'}
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
                className="relative px-8 py-4 bg-primary text-white rounded-full font-bold text-center overflow-hidden group shadow-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.span 
                  className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <span className="relative z-10">
                  View Resume
                </span>
              </motion.a>
              
              <motion.a 
                href="#contact" 
                className="btn-secondary"
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
              className="flex items-center space-x-6"
            >
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleSocialClick(link.name.toLowerCase())}
                  className="text-gray-600 hover:text-primary transition-colors p-3 hover:bg-gray-100 rounded-full border border-gray-200 bg-white/80 backdrop-blur-sm"
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

          {/* Expertise Card - take up less space on larger screens */}
          <motion.div 
            initial={{ opacity: 0, x: 50, rotateY: -15 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            style={{
              rotateX: rotateX,
              rotateY: rotateY,
              transformStyle: "preserve-3d",
            }}
            className="lg:col-span-5 bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden"
          >
            <motion.div 
              className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-primary-100/30 to-primary-200/20 rounded-full blur-xl"
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
                className="text-2xl font-bold mb-6 text-gray-800"
                animate={{
                  textShadow: [
                    '0 0 1px rgba(0,0,0,0.1)',
                    '0 0 2px rgba(0,0,0,0.2)',
                    '0 0 1px rgba(0,0,0,0.1)',
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Expertise
              </motion.h3>
              
              <div className="space-y-5">
                {personalInfo.expertise.map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 + (index * 0.1) }}
                    className="flex items-start gap-4 group"
                  >
                    <motion.div 
                      className="mt-1 p-2 bg-primary-50 rounded-lg"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <div className="text-primary-600">
                        {expertiseIcons[index % expertiseIcons.length]}
                      </div>
                    </motion.div>
                    <div>
                      <motion.p 
                        className="font-semibold text-gray-800 group-hover:text-primary transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        {item}
                      </motion.p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-lg font-semibold text-gray-700 mb-4">Interests</h4>
                <div className="flex flex-wrap gap-2">
                  {personalInfo.interests.slice(0, 5).map((interest, index) => (
                    <motion.span 
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1 + index * 0.1 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="text-sm bg-primary-50 text-primary-700 px-3 py-1.5 rounded-full border border-primary-200 hover:bg-primary-100 transition-all cursor-default"
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
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden sm:block"
      >
        <motion.a 
          href="#about" 
          aria-label="Scroll down"
          className="flex flex-col items-center gap-2 p-4 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200/50 hover:bg-gray-50 transition-all group shadow-sm"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          whileHover={{ scale: 1.1 }}
        >
          <FiArrowDown className="text-gray-600 group-hover:text-primary transition-colors" size={20} />
          <span className="text-xs text-gray-500 font-medium">Scroll</span>
        </motion.a>
      </motion.div>
    </section>
  );
};

export default Hero;