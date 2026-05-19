import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiArrowRight, FiArrowDown } from 'react-icons/fi';
import { personalInfo } from '../data/personalInfo';
import useAnalytics from '../hooks/usePostHog';

const RotatingRoles = () => {
  const roles = ['AI Solutions', 'SaaS Platforms', 'Full-Stack Apps', 'RAG Systems'];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <span className="inline-flex flex-col overflow-hidden h-[1.3em] align-bottom text-left justify-start min-w-[260px] sm:min-w-[340px] md:min-w-[400px] lg:min-w-[480px]">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -30, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-primary whitespace-nowrap"
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

const Hero = () => {
  const { trackEvent } = useAnalytics();
  const shouldReduceMotion = useReducedMotion();
  const handleSocialClick = (platform: string) => trackEvent('social_link_click', { platform });
  const handleResumeClick = () => trackEvent('resume_view');

  const animationProps = shouldReduceMotion ? {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5 }
  } : undefined;

  return (
    <section
      id="home"
      className="min-h-[100dvh] flex flex-col justify-center relative overflow-hidden bg-background pt-24 pb-12"
    >
      {/* Subtle Grid Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]" 
        style={{
          backgroundImage: `linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '4rem 4rem'
        }}
        aria-hidden="true"
      />
      
      {/* Soft gradient blur */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/20 rounded-full blur-[120px] pointer-events-none opacity-50 dark:opacity-20"
        aria-hidden="true"
      />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          {...animationProps}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-3 rounded-full px-4 py-2 bg-secondary/80 border border-border backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" aria-hidden="true"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" aria-hidden="true"></span>
            </span>
            <span className="text-xs font-semibold tracking-widest text-foreground uppercase">Available for work</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          {...(shouldReduceMotion ? { ...animationProps, transition: { delay: 0.1 } } : {})}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.2] tracking-tight text-foreground mb-6"
        >
          Building intelligent <span className="text-muted-foreground">experiences for</span> <br className="hidden lg:block" />
          <RotatingRoles />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          {...(shouldReduceMotion ? { ...animationProps, transition: { delay: 0.2 } } : {})}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-12 text-balance font-medium"
        >
          I'm {personalInfo.name.split(' ')[0]}, a software engineer specializing in scalable architecture and cutting-edge AI integrations. Transforming complex problems into elegant solutions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          {...(shouldReduceMotion ? { ...animationProps, transition: { delay: 0.3 } } : {})}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <a
            href={personalInfo.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleResumeClick}
            className="group flex items-center justify-center gap-2 px-8 py-4 w-full sm:w-auto rounded-full font-semibold text-background bg-foreground hover:bg-foreground/90 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            View Resume
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </a>
          
          <a
            href="#projects"
            className="group flex items-center justify-center gap-2 px-8 py-4 w-full sm:w-auto rounded-full font-semibold text-foreground bg-transparent border border-border hover:bg-secondary transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Explore Work
          </a>
        </motion.div>

        {/* Social Links */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          {...(shouldReduceMotion ? { ...animationProps, transition: { delay: 0.4 } } : {})}
          className="mt-16 flex items-center gap-6"
        >
          {[
            { name: 'GitHub', icon: <FiGithub size={22} aria-hidden="true" />, href: personalInfo.socialLinks.github },
            { name: 'LinkedIn', icon: <FiLinkedin size={22} aria-hidden="true" />, href: personalInfo.socialLinks.linkedin },
            { name: 'Email', icon: <FiMail size={22} aria-hidden="true" />, href: personalInfo.socialLinks.email }
          ].map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleSocialClick(link.name.toLowerCase())}
              className="text-muted-foreground hover:text-foreground transition-colors p-2 -m-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-md"
              aria-label={link.name}
              title={link.name}
            >
              {link.icon}
            </a>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        {...(shouldReduceMotion ? { ...animationProps, transition: { delay: 0.5 } } : {})}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
      >
        <a
          href="#projects"
          aria-label="Scroll down to projects section"
          className="flex flex-col items-center gap-3 text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-md p-2"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] font-semibold">Scroll</span>
          <motion.div
            animate={shouldReduceMotion ? {} : { y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <FiArrowDown size={16} aria-hidden="true" />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;
