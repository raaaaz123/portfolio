import { motion, useReducedMotion } from 'framer-motion';
import { personalInfo } from '../data/personalInfo';
import { ease } from '../lib/ui';
import useAnalytics from '../hooks/usePostHog';
import usePointerGlow from '../hooks/usePointerGlow';

const socials = [
  { name: 'GitHub', href: personalInfo.socialLinks.github },
  { name: 'LinkedIn', href: personalInfo.socialLinks.linkedin },
  { name: 'Email', href: personalInfo.socialLinks.email },
];

/** A headline line that slides up out of its own clipping box. */
const Line: React.FC<{ children: React.ReactNode; delay: number; still: boolean }> = ({
  children,
  delay,
  still,
}) => (
  <span className="block overflow-hidden pb-[0.08em]">
    <motion.span
      className="block"
      initial={{ y: still ? 0 : '110%', opacity: still ? 0 : 1 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: still ? 0.5 : 1.05, delay, ease }}
    >
      {children}
    </motion.span>
  </span>
);

const Hero: React.FC<{ onHire: () => void }> = ({ onHire }) => {
  const { trackEvent } = useAnalytics();
  const glow = usePointerGlow();
  const still = !!useReducedMotion();

  const step = (i: number) => ({
    initial: { opacity: 0, y: still ? 0 : 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay: 0.45 + 0.08 * i, ease },
  });

  return (
    <section
      id="home"
      className="relative z-10 flex min-h-[86svh] scroll-mt-20 flex-col justify-center overflow-hidden pb-14 pt-28 sm:min-h-[90svh] sm:pb-16 sm:pt-32"
    >
      {/* Something for the glass to refract. Kept faint on purpose — this is
          atmosphere, not a gradient hero. */}
      {!still && (
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
          <div
            className="absolute -left-[8%] top-[6%] h-[46vmin] w-[46vmin] rounded-full bg-primary/[0.16] blur-[100px] dark:bg-primary/[0.13]"
            style={{ animation: 'orb-drift 26s ease-in-out infinite' }}
          />
          <div
            className="absolute right-[2%] top-[38%] h-[38vmin] w-[38vmin] rounded-full bg-foreground/[0.07] blur-[80px]"
            style={{ animation: 'orb-drift 34s ease-in-out infinite reverse' }}
          />
        </div>
      )}

      <div className="shell">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-7 flex flex-wrap items-center gap-x-3 gap-y-2 sm:mb-9"
        >
          <span className="label text-foreground">Full-Stack AI Builder</span>
          <span className="h-px w-6 bg-hairline" aria-hidden="true" />
          <span className="label">{personalInfo.location}</span>
        </motion.div>

        <h1 className="max-w-[19ch] font-display text-[2.1rem] font-light leading-[1.08] tracking-[-0.02em] text-foreground min-[400px]:text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl">
          <Line delay={0.05} still={still}>
            I build AI products
          </Line>
          <Line delay={0.16} still={still}>
            <span className="caret">from idea to launch.</span>
          </Line>
        </h1>

        <motion.p
          {...step(0)}
          className="mt-6 max-w-[54ch] text-[12.5px] leading-relaxed text-muted-foreground sm:mt-7 sm:text-sm"
        >
          Three years building SaaS platforms, RAG systems and full-stack apps — from vector
          search infrastructure to mobile apps with 50k+ users.
        </motion.p>

        <motion.div {...step(1)} className="mt-9 flex flex-wrap items-center gap-x-3 gap-y-3 sm:mt-10">
          <motion.button
            type="button"
            onClick={onHire}
            whileHover={still ? undefined : { y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.25, ease }}
            className="sheen inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-[12px] font-medium tracking-wide text-background shadow-lg shadow-foreground/15"
          >
            Hire me
          </motion.button>

          <motion.a
            href={personalInfo.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('resume_view')}
            onPointerMove={glow}
            whileHover={still ? undefined : { y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.25, ease }}
            className="glass spotlight group inline-flex items-center gap-2 rounded-full px-6 py-3 text-[12px] font-medium tracking-wide text-foreground"
          >
            Résumé
            <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </motion.a>
        </motion.div>

        <motion.div {...step(2)} className="mt-5">
          <span className="glass label inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-foreground">
            <span className="relative flex h-1.5 w-1.5">
              {!still && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-70" />
              )}
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
            Available for work
          </span>
        </motion.div>

        <motion.div {...step(3)} className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 sm:mt-12">
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('social_link_click', { platform: s.name.toLowerCase() })}
              className="label link-underline hover:text-foreground"
            >
              {s.name}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
