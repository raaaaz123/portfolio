import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiArrowDown, FiArrowUpRight } from 'react-icons/fi';
import { personalInfo } from '../data/personalInfo';
import useAnalytics from '../hooks/usePostHog';

/* ─── Typewriter ─── */
const TypewriterText: React.FC<{ texts: string[] }> = ({ texts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const fullText = texts[currentIndex];
      if (!isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        if (currentText === fullText) setTimeout(() => setIsDeleting(true), 2000);
      } else {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? 40 : 80);
    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentIndex, texts]);

  return (
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-cyan-400 to-emerald-400 dark:from-teal-400 dark:via-cyan-300 dark:to-emerald-300">
      {currentText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
        className="text-teal-500 dark:text-teal-400 ml-0.5"
      >
        |
      </motion.span>
    </span>
  );
};

/* ─── Aurora Mesh Background ─── */
const AuroraBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Base gradient layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background" />

      {/* Aurora blob 1 — teal */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-[0.08] dark:opacity-[0.12]"
        style={{
          background: 'radial-gradient(circle, hsl(168 76% 50%) 0%, transparent 70%)',
          top: '-10%',
          right: '-5%',
          filter: 'blur(80px)',
        }}
        animate={{
          x: [0, 60, -30, 0],
          y: [0, -40, 20, 0],
          scale: [1, 1.2, 0.95, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Aurora blob 2 — cyan */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-[0.06] dark:opacity-[0.10]"
        style={{
          background: 'radial-gradient(circle, hsl(190 90% 50%) 0%, transparent 70%)',
          bottom: '-15%',
          left: '-10%',
          filter: 'blur(80px)',
        }}
        animate={{
          x: [0, -50, 40, 0],
          y: [0, 30, -50, 0],
          scale: [1, 1.15, 1.05, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Aurora blob 3 — emerald, center */}
      <motion.div
        className="absolute w-[450px] h-[450px] rounded-full opacity-[0.05] dark:opacity-[0.08]"
        style={{
          background: 'radial-gradient(circle, hsl(155 72% 45%) 0%, transparent 70%)',
          top: '30%',
          left: '40%',
          filter: 'blur(100px)',
        }}
        animate={{
          x: [0, 40, -60, 0],
          y: [0, -30, 40, 0],
          scale: [1, 1.1, 1.2, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Aurora blob 4 — blue accent, subtle */}
      <motion.div
        className="absolute w-[350px] h-[350px] rounded-full opacity-[0.04] dark:opacity-[0.07]"
        style={{
          background: 'radial-gradient(circle, hsl(210 80% 55%) 0%, transparent 70%)',
          top: '50%',
          right: '20%',
          filter: 'blur(90px)',
        }}
        animate={{
          x: [0, -30, 50, 0],
          y: [0, 50, -20, 0],
          scale: [1.1, 1, 1.15, 1.1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Noise texture overlay for depth */}
      <div
        className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        }}
      />
    </div>
  );
};

/* ─── Floating Particles ─── */
const FloatingParticles = () => {
  const particles = Array.from({ length: 60 }, (_, i) => {
    const type = i % 3; // 0 = rise, 1 = drift, 2 = pulse
    return {
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: type === 2 ? Math.random() * 4 + 2.5 : Math.random() * 3 + 1,
      duration: Math.random() * 10 + 8,
      delay: Math.random() * 8,
      type,
    };
  });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={`absolute rounded-full ${
            p.type === 0
              ? 'bg-teal-500/25 dark:bg-teal-400/25'
              : p.type === 1
              ? 'bg-cyan-400/20 dark:bg-cyan-300/20'
              : 'bg-emerald-400/15 dark:bg-emerald-300/18'
          }`}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={
            p.type === 0
              ? { y: [0, -60, 0], x: [0, 10, -10, 0], opacity: [0, 0.7, 0] }
              : p.type === 1
              ? { x: [0, 40, -20, 0], y: [0, -15, 10, 0], opacity: [0, 0.5, 0.3, 0] }
              : { scale: [0.5, 1.5, 0.5], opacity: [0.1, 0.6, 0.1] }
          }
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

/* ─── Expertise Pill ─── */
const ExpertisePill: React.FC<{ text: string; index: number }> = ({ text, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1 + index * 0.08, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const }}
    whileHover={{ y: -3, transition: { duration: 0.2 } }}
    className="group flex items-center gap-2.5 px-5 py-3 rounded-xl bg-card border border-border/70 hover:border-teal-500/40 dark:hover:border-teal-400/30 hover:bg-teal-50/60 dark:hover:bg-teal-500/[0.08] shadow-sm hover:shadow-md hover:shadow-teal-500/[0.06] backdrop-blur-sm transition-all duration-300 cursor-default"
  >
    <div className="w-2 h-2 rounded-full bg-teal-500 dark:bg-teal-400 shadow-sm shadow-teal-500/40" />
    <span className="text-sm font-semibold text-foreground/80 group-hover:text-foreground transition-colors">
      {text}
    </span>
  </motion.div>
);

/* ─── Stat ─── */
const StatItem: React.FC<{ value: string; label: string; index: number }> = ({ value, label, index }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 1.1 + index * 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const }}
    className="text-center px-4"
  >
    <div className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">{value}</div>
    <div className="text-xs text-muted-foreground mt-1 uppercase tracking-widest font-medium">{label}</div>
  </motion.div>
);

/* ─── Main Hero ─── */
const Hero = () => {
  const { trackEvent } = useAnalytics();
  const containerRef = useRef<HTMLElement>(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const smoothX = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const smoothY = useSpring(mouseY, { stiffness: 40, damping: 25 });
  const glowX = useTransform(smoothX, [0, 1], ['30%', '70%']);
  const glowY = useTransform(smoothY, [0, 1], ['30%', '70%']);

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

  const rotatingTexts = ['AI Solutions', 'SaaS Platforms', 'Mobile Apps', 'RAG Systems'];

  const socialLinks = [
    { name: 'GitHub', icon: <FiGithub size={18} />, href: personalInfo.socialLinks.github },
    { name: 'LinkedIn', icon: <FiLinkedin size={18} />, href: personalInfo.socialLinks.linkedin },
    { name: 'Email', icon: <FiMail size={18} />, href: personalInfo.socialLinks.email },
  ];

  const stats = [
    { value: '3+', label: 'Years' },
    { value: '30+', label: 'Projects' },
    { value: '8+', label: 'SaaS Built' },
  ];

  const handleSocialClick = (platform: string) => trackEvent('social_link_click', { platform });
  const handleResumeClick = () => trackEvent('resume_view');

  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
  };

  return (
    <section
      ref={containerRef}
      id="home"
      className="min-h-[100dvh] flex items-center justify-center relative overflow-hidden pt-20 sm:pt-24 md:pt-16 bg-background text-foreground"
    >
      {/* Animated Aurora Background */}
      <AuroraBackground />
      <FloatingParticles />

      {/* Mouse-follow glow */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none opacity-[0.04] dark:opacity-[0.07]"
        style={{
          background: 'radial-gradient(circle, hsl(168 76% 50%) 0%, transparent 60%)',
          left: glowX,
          top: glowY,
          x: '-50%',
          y: '-50%',
          filter: 'blur(60px)',
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto flex flex-col items-center text-center"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          {/* Status Badge */}
          <motion.div variants={fadeUp} className="mb-8">
            <div className="inline-flex items-center gap-2.5 rounded-full px-4 py-2 bg-card/70 dark:bg-card/50 border border-border/50 backdrop-blur-md shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-sm font-medium text-muted-foreground">Available for work</span>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={fadeUp}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight mb-6"
          >
            <span className="text-foreground">Hi, I'm </span>
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-cyan-500 to-emerald-500 dark:from-teal-400 dark:via-cyan-400 dark:to-emerald-400">
                {personalInfo.name}
              </span>
              {/* Underline accent */}
              <motion.span
                className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-gradient-to-r from-teal-500/60 via-cyan-400/60 to-emerald-400/60"
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.9, duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
              />
            </span>
          </motion.h1>

          {/* Dynamic Subtitle */}
          <motion.div
            variants={fadeUp}
            className="text-xl sm:text-2xl md:text-3xl mb-6 text-muted-foreground font-light"
          >
            <span>I build </span>
            <span className="font-semibold">
              <TypewriterText texts={rotatingTexts} />
            </span>
          </motion.div>

          {/* Bio */}
          <motion.p
            variants={fadeUp}
            className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed mb-10"
          >
            {personalInfo.bio.split('.').slice(0, 2).join('.') + '.'}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 mb-10 w-full sm:w-auto">
            <motion.a
              href={personalInfo.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleResumeClick}
              className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-teal-500 dark:to-cyan-500 shadow-lg shadow-teal-500/20 dark:shadow-teal-500/15 hover:shadow-xl hover:shadow-teal-500/30 transition-all duration-300"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              View Resume
              <FiArrowUpRight
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                size={16}
              />
            </motion.a>

            <motion.a
              href="#contact"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl font-semibold text-sm border border-border/80 text-foreground bg-card/60 dark:bg-card/40 backdrop-blur-sm hover:bg-teal-50/50 dark:hover:bg-teal-500/[0.06] hover:border-teal-500/30 dark:hover:border-teal-400/30 transition-all duration-300"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              Get in Touch
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={fadeUp} className="flex items-center gap-1 mb-10">
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleSocialClick(link.name.toLowerCase())}
                className="p-3 rounded-xl text-muted-foreground hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-50/60 dark:hover:bg-teal-500/[0.08] transition-all duration-300"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label={link.name}
              >
                {link.icon}
              </motion.a>
            ))}
          </motion.div>

          {/* Stats Row */}
          <motion.div variants={fadeUp} className="flex items-center mb-8">
            {stats.map((stat, index) => (
              <div key={stat.label} className="flex items-center">
                <StatItem value={stat.value} label={stat.label} index={index} />
                {index < stats.length - 1 && (
                  <div className="w-px h-8 bg-border/60 mx-2" />
                )}
              </div>
            ))}
          </motion.div>

          {/* Expertise Grid */}
          <motion.div variants={fadeUp} className="w-full max-w-2xl">
            <div className="flex flex-wrap justify-center gap-2.5">
              {personalInfo.expertise.map((item, index) => (
                <ExpertisePill key={index} text={item} index={index} />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-1.5"
      >
        <motion.a
          href="#projects"
          aria-label="Scroll to projects"
          className="flex flex-col items-center gap-1.5 text-muted-foreground/40 hover:text-muted-foreground transition-colors"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-[10px] uppercase tracking-[0.2em] font-medium">Scroll</span>
          <FiArrowDown size={14} />
        </motion.a>
      </motion.div>
    </section>
  );
};

export default Hero;
