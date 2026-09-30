import { motion, useReducedMotion } from 'framer-motion';
import { SiGithub, SiLinkedin } from 'react-icons/si';
import { FiDownload } from 'react-icons/fi';
import { personalInfo } from '../data/personalInfo';
import { ease, openHire } from '../lib/ui';
import useAnalytics from '../hooks/usePostHog';

const FIRST = personalInfo.name.split(' ')[0];

/** Letters arrive wide and settle into the condensed cut. */
const Squeeze: React.FC<{ text: string; delay: number; play: boolean }> = ({ text, delay, play }) => (
  <>
    {text.split('').map((ch, i) => (
      <span
        key={i}
        aria-hidden="true"
        className="inline-block"
        style={{
          animation: `squeeze-in 1.2s cubic-bezier(0.22,1,0.36,1) ${delay + i * 0.05}s both`,
          animationPlayState: play ? 'running' : 'paused',
          whiteSpace: 'pre',
        }}
      >
        {ch}
      </span>
    ))}
  </>
);

/** Typographic hero: meta row, a two-line name, one disc, two buttons. */
const Hero: React.FC<{ ready: boolean }> = ({ ready }) => {
  const { trackEvent } = useAnalytics();
  const still = !!useReducedMotion();

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: still ? 0 : 12 },
    animate: ready ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 0.7, delay, ease },
  });

  return (
    <section id="home" className="bg-paper pb-14 pt-28 text-ink sm:pb-20 sm:pt-32">
      <div className="shell">
        {/* Meta row */}
        <motion.div {...fade(0.2)}>
          <div className="flex flex-wrap justify-between gap-x-6 gap-y-1 pb-3 text-[13px] font-medium text-muted-foreground">
            <span>AI & full-stack engineer</span>
            <span className="hidden sm:inline">{personalInfo.location}, IST</span>
            <span>Shipping since 2021</span>
          </div>
          <div className="rule-dash text-ink/30" />
        </motion.div>

        {/* Name */}
        <h1
          className="display relative mt-10 text-[26vw] leading-[0.84] sm:mt-12 sm:text-[19vw] xl:text-[18vw] 2xl:text-[17rem]"
          aria-label={`${personalInfo.name}, ships AI`}
        >
          <span className="block">
            <Squeeze text={FIRST} delay={0.05} play={ready} />
          </span>
          <span className="block text-right">
            <Squeeze text="ships AI." delay={0.3} play={ready} />
          </span>

          {/* Disc overlapping the two lines */}
          <motion.span
            aria-hidden="true"
            initial={{ scale: 0, rotate: -90 }}
            animate={ready ? { scale: 1, rotate: 0 } : undefined}
            transition={{ type: 'spring', stiffness: 160, damping: 14, delay: 0.8 }}
            className="absolute left-[46%] top-[27%] flex h-[0.62em] w-[0.62em] items-center justify-center rounded-full border-[0.045em] border-pop bg-ink text-pop"
          >
            <span className="text-[0.24em] [--wdth:80]">Dev</span>
          </motion.span>
        </h1>

        {/* What I'm looking for — the line a recruiter scans for */}
        <motion.p
          {...fade(0.8)}
          className="mt-10 flex max-w-[60ch] flex-wrap items-center gap-x-2 gap-y-1 text-[17px] sm:mt-12 sm:text-[19px]"
        >
          <span className="mr-1 inline-flex items-center gap-2 rounded-full bg-ink px-3 py-1 text-[14px] font-semibold text-paper">
            <span className="h-2 w-2 rounded-full bg-pop" aria-hidden="true" />
            Available now
          </span>
          <span>
            Looking for <strong>AI & full-stack engineering roles</strong>, remote or with relocation.
          </span>
        </motion.p>

        {/* Buttons */}
        <motion.div {...fade(0.9)} className="mt-6 flex flex-wrap items-center gap-3">
          <a
            href={personalInfo.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('resume_view', { from: 'hero' })}
            className="pill gap-2 border-[1.5px] border-ink bg-pop text-ink"
          >
            <FiDownload aria-hidden="true" />
            Download résumé
          </a>
          <button
            type="button"
            onClick={() => {
              trackEvent('hire_open', { from: 'hero' });
              openHire();
            }}
            className="pill border-[1.5px] border-ink text-ink hover:bg-ink hover:text-paper"
          >
            Get in touch
          </button>
          <a
            href={personalInfo.socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('social_link_click', { platform: 'linkedin', from: 'hero' })}
            aria-label="LinkedIn"
            className="flex h-12 w-12 items-center justify-center rounded-full border-[1.5px] border-ink text-[18px] transition-colors hover:bg-ink hover:text-paper"
          >
            <SiLinkedin />
          </a>
          <a
            href={personalInfo.socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('social_link_click', { platform: 'github', from: 'hero' })}
            aria-label="GitHub"
            className="flex h-12 w-12 items-center justify-center rounded-full border-[1.5px] border-ink text-[18px] transition-colors hover:bg-ink hover:text-paper"
          >
            <SiGithub />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
