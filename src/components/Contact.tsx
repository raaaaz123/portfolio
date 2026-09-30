import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { IconType } from 'react-icons';
import { SiGithub, SiLinkedin, SiWhatsapp } from 'react-icons/si';
import { FiArrowUpRight, FiCheck, FiCopy, FiDownload, FiPhone } from 'react-icons/fi';
import { personalInfo } from '../data/personalInfo';
import { ease, openCommand, openHire } from '../lib/ui';
import useAnalytics from '../hooks/usePostHog';
import { Magnetic } from './fx';

const TILES: { name: string; detail: string; href: string; Icon: IconType }[] = [
  { name: 'LinkedIn', detail: 'Profile & history', href: personalInfo.socialLinks.linkedin, Icon: SiLinkedin },
  { name: 'GitHub', detail: 'raaaaz123', href: personalInfo.socialLinks.github, Icon: SiGithub },
  { name: 'WhatsApp', detail: 'Fastest reply', href: personalInfo.socialLinks.whatsapp, Icon: SiWhatsapp },
  { name: 'Résumé', detail: 'PDF résumé', href: personalInfo.resumeUrl, Icon: FiDownload },
  { name: 'Phone', detail: personalInfo.phone, href: personalInfo.socialLinks.phone, Icon: FiPhone },
];

const Contact = () => {
  const { trackEvent } = useAnalytics();
  const still = !!useReducedMotion();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopied(true);
      trackEvent('email_copy');
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = personalInfo.socialLinks.email;
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-pop pb-10 pt-24 text-ink sm:pt-32">
      <div className="shell">
        <p className="flex items-center gap-2 text-[15px] font-semibold">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ink opacity-50" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-ink" />
          </span>
          Open to full-time roles
        </p>
        <h2 className="display mt-4 text-[clamp(3.4rem,9.5vw,10rem)]">
          {['Let’s', 'work together.'].map((l, i) => (
            <span key={l} className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: still ? 0 : '100%' }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.1, ease }}
              >
                {l}
              </motion.span>
            </span>
          ))}
        </h2>

        <div className="mt-12 flex flex-wrap items-center gap-3">
          <Magnetic>
            <button
              type="button"
              onClick={() => {
                trackEvent('hire_open', { from: 'contact' });
                openHire();
              }}
              className="pill border-[1.5px] border-ink bg-ink px-9 py-5 text-[18px] text-paper"
            >
              <span className="pill-roll">
                <span>Get in touch</span>
                <span aria-hidden="true">Get in touch</span>
              </span>
            </button>
          </Magnetic>
          <Magnetic>
            <button
              type="button"
              onClick={copy}
              className="pill gap-2 border-[1.5px] border-ink px-7 py-5 text-[17px] text-ink hover:bg-ink hover:text-paper"
              aria-live="polite"
            >
              {copied ? <FiCheck aria-hidden="true" /> : <FiCopy aria-hidden="true" />}
              {copied ? 'Email copied' : personalInfo.email}
            </button>
          </Magnetic>
          <button
            type="button"
            onClick={openCommand}
            className="hidden items-center gap-2 text-[14px] font-semibold text-ink/70 hover:text-ink lg:flex"
          >
            or press
            <kbd className="rounded-md border-[1.5px] border-ink/40 px-1.5 py-0.5 font-mono text-[12px]">⌘K</kbd>
          </button>
        </div>

        <ul className="mt-14 grid grid-cols-2 gap-3 lg:grid-cols-5">
          {TILES.map(({ name, detail, href, Icon }, i) => (
            <motion.li
              key={name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.06, ease }}
              className={i === TILES.length - 1 ? 'col-span-2 lg:col-span-1' : undefined}
            >
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('social_link_click', { platform: name.toLowerCase(), from: 'contact' })}
                className="group flex h-full flex-col justify-between gap-6 rounded-[20px] border-[1.5px] border-ink bg-paper p-4 sm:gap-8 sm:p-5 transition-all duration-300 hover:-translate-y-1.5 hover:bg-ink hover:text-paper hover:shadow-[6px_6px_0_0_hsl(var(--ink)/0.35)]"
              >
                <span className="flex items-start justify-between">
                  <Icon className="text-[28px] transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
                  <FiArrowUpRight className="text-[22px] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" />
                </span>
                <span>
                  <span className="display block text-[26px] sm:text-[34px]">{name}</span>
                  <span className="text-[13px] opacity-70 sm:text-[14px]">{detail}</span>
                </span>
              </a>
            </motion.li>
          ))}
        </ul>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-3 border-t-[1.5px] border-ink/25 pt-6 text-[14px] text-ink/70">
          <span>
            © {new Date().getFullYear()} {personalInfo.name}, {personalInfo.location}
          </span>
          <span>Built with React and Framer Motion</span>
        </div>
      </div>

      {/* Oversized wordmark bleeding off the bottom edge */}
      <p
        className="display pointer-events-none mt-10 select-none whitespace-nowrap text-center text-[25vw] leading-[0.72] text-ink/15"
        aria-hidden="true"
      >
        {personalInfo.name.split(' ')[0]}
      </p>
    </section>
  );
};

export default Contact;
