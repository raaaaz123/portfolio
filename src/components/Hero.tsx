import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiArrowRight, FiArrowDown, FiCode, FiLayers, FiCpu, FiBox, FiDatabase, FiMessageSquare, FiSmartphone } from 'react-icons/fi';
import { personalInfo } from '../data/personalInfo';
import useAnalytics from '../hooks/usePostHog';

/* --- Floating Geometric Shapes Background --- */
const FloatingShapes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-background" />

      {/* Modern Gradient Mesh Blob 1 */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full opacity-[0.07] dark:opacity-[0.15]"
        style={{
          background: 'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 60%)',
          top: '-20%',
          right: '-10%',
          filter: 'blur(120px)',
        }}
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 20, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      {/* Modern Gradient Mesh Blob 2 */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-[0.05] dark:opacity-[0.1]"
        style={{
          background: 'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 60%)',
          bottom: '-10%',
          left: '-10%',
          filter: 'blur(100px)',
        }}
        animate={{
          x: [0, -30, 30, 0],
          y: [0, 20, -30, 0],
          scale: [1, 1.05, 1.15, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        }}
      />
    </div>
  );
};

/* --- Rotating Text --- */
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
    <div className="h-[40px] sm:h-[50px] md:h-[60px] overflow-hidden relative w-full flex items-center mt-2">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={index}
          initial={{ y: 40, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -40, opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute text-primary font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight"
        >
          {roles[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

/* --- Dynamic Expertise Particles --- */
/* --- Dynamic Orbiting Globe --- */
const expertiseNodes = [
  { title: "15+ Products Shipped", icon: FiBox },
  { title: "SaaS Builder", icon: FiLayers },
  { title: "RAG Systems", icon: FiDatabase },
  { title: "Agentic AI", icon: FiCpu },
  { title: "LLMs", icon: FiMessageSquare },
  { title: "Mobile Apps", icon: FiSmartphone },
  { title: "Full-Stack", icon: FiCode },
];

const OrbitingGlobe = () => {
  const [radius, setRadius] = useState(140);
  
  useEffect(() => {
    const handleResize = () => {
      setRadius(window.innerWidth >= 1024 ? 220 : 140);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const containerSize = radius * 2;

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-visible">
      {/* Central Object */}
      <div className="absolute w-20 h-20 lg:w-28 lg:h-28 rounded-full border border-primary/20 bg-primary/10 backdrop-blur-xl flex items-center justify-center shadow-2xl shadow-primary/20 z-10">
         <span className="text-xl lg:text-3xl font-bold text-primary tracking-tighter">&lt; /&gt;</span>
         {/* Dashed rings */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border border-primary/30 scale-110 border-dashed" 
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border border-primary/10 scale-125 border-dashed" 
          />
      </div>

      {/* Orbit Ring Container */}
      <motion.div
        className="absolute rounded-full border border-primary/5"
        style={{ width: containerSize, height: containerSize }}
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
      >
        {expertiseNodes.map((node, i) => {
          const angle = (i / expertiseNodes.length) * (2 * Math.PI);
          const x = radius + radius * Math.cos(angle);
          const y = radius + radius * Math.sin(angle);
          const Icon = node.icon;

          return (
            <motion.div
              key={i}
              className="absolute flex items-center justify-center pointer-events-auto cursor-default"
              style={{ left: x, top: y, x: "-50%", y: "-50%" }}
              initial={{ rotate: 0 }}
              animate={{ rotate: -360 }}
              transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            >
              <div className="flex items-center gap-1.5 lg:gap-2.5 px-3 py-1.5 lg:px-4 lg:py-2.5 rounded-full bg-card/80 dark:bg-card/60 backdrop-blur-xl border border-border/80 shadow-lg shadow-primary/5 hover:border-primary/50 transition-colors duration-300">
                <Icon className="text-primary w-3 h-3 lg:w-4 lg:h-4" />
                <span className="font-semibold text-foreground text-[10px] lg:text-sm whitespace-nowrap">{node.title}</span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

/* --- Main Hero Component --- */
const Hero = () => {
  const { trackEvent } = useAnalytics();
  const containerRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const handleSocialClick = (platform: string) => trackEvent('social_link_click', { platform });
  const handleResumeClick = () => trackEvent('resume_view');

  return (
    <section
      ref={containerRef}
      id="home"
      className="min-h-[100dvh] flex items-center relative overflow-hidden pt-24 pb-12 bg-background text-foreground"
    >
      <FloatingShapes />

      {/* Mouse tracker glow */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full pointer-events-none opacity-[0.03] dark:opacity-[0.06] z-0"
        style={{
          background: 'hsl(var(--primary))',
          left: useTransform(useSpring(mouseX, { stiffness: 40 }), [0, 1], ['20%', '80%']),
          top: useTransform(useSpring(mouseY, { stiffness: 40 }), [0, 1], ['20%', '80%']),
          x: '-50%',
          y: '-50%',
          filter: 'blur(50px)',
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 h-full flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center w-full">
          
          {/* Left Column: Typography and Actions */}
          <div className="flex flex-col items-start text-left max-w-2xl">
            {/* Status Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mb-8 inline-flex items-center gap-3 rounded-full px-4 py-2 bg-card/50 border border-border/80 backdrop-blur-md shadow-sm"
            >
              <div className="relative flex h-3 w-3 items-center justify-center">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-50"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </div>
              <span className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">Available for work</span>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="mb-4"
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] font-extrabold leading-[1.05] tracking-tight text-foreground">
                Hi, I'm <span className="text-foreground">{personalInfo.name.split(' ')[0]}</span>.
              </h1>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-muted-foreground">I build</span>
              </div>
              <RotatingRoles />
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-10 mt-4 max-w-lg"
            >
              Transforming complex problems into elegant, scalable software solutions with a focus on cutting-edge AI integrations.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap items-center gap-4 mb-12"
            >
              <motion.a
                href={personalInfo.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleResumeClick}
                className="group flex items-center gap-3 px-8 py-4 rounded-full font-bold text-primary-foreground bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                View Resume
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </motion.a>
              
              <motion.a
                href="#projects"
                className="group flex items-center gap-3 px-8 py-4 rounded-full font-bold text-foreground bg-secondary hover:bg-secondary/90 dark:bg-secondary/80 dark:hover:bg-secondary backdrop-blur-md border border-border/80 dark:border-border transition-all duration-300"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                View Work
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="flex items-center gap-5"
            >
              <span className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mr-2">Connect</span>
              {[
                { name: 'GitHub', icon: <FiGithub size={20} />, href: personalInfo.socialLinks.github },
                { name: 'LinkedIn', icon: <FiLinkedin size={20} />, href: personalInfo.socialLinks.linkedin },
                { name: 'Email', icon: <FiMail size={20} />, href: personalInfo.socialLinks.email }
              ].map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleSocialClick(link.name.toLowerCase())}
                  className="text-muted-foreground hover:text-primary transition-colors p-2 -m-2"
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={link.name}
                  title={link.name}
                >
                  {link.icon}
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Globe Orbit Elements */}
          <div className="block relative h-[350px] sm:h-[450px] lg:h-[600px] w-full pointer-events-none mt-8 lg:mt-0 mx-4 sm:mx-6 lg:mx-0">
            <div className="absolute inset-0">
               <OrbitingGlobe />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Hidden on mobile to prevent overlap */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
      >
        <motion.a
          href="#projects"
          aria-label="Scroll down"
          className="flex flex-col items-center gap-2 text-muted-foreground/60 hover:text-primary transition-colors"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Scroll</span>
          <div className="p-2 rounded-full bg-secondary/80 backdrop-blur-sm border border-border">
            <FiArrowDown size={14} />
          </div>
        </motion.a>
      </motion.div>
    </section>
  );
};

export default Hero;
