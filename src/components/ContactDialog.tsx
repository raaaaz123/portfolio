import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { IconType } from 'react-icons';
import { SiGithub, SiLinkedin, SiWhatsapp } from 'react-icons/si';
import { FiArrowUpRight, FiCheck, FiCopy, FiDownload, FiMail, FiPhone, FiX } from 'react-icons/fi';
import { personalInfo } from '../data/personalInfo';
import { ease } from '../lib/ui';
import useAnalytics from '../hooks/usePostHog';

interface Channel {
  id: string;
  name: string;
  detail: string;
  href: string;
  Icon: IconType;
  external?: boolean;
}

const CHANNELS: Channel[] = [
  { id: 'email', name: 'Email', detail: personalInfo.email, href: personalInfo.socialLinks.email, Icon: FiMail },
  { id: 'linkedin', name: 'LinkedIn', detail: 'Rasheed Maliyekkal', href: personalInfo.socialLinks.linkedin, Icon: SiLinkedin, external: true },
  { id: 'whatsapp', name: 'WhatsApp', detail: personalInfo.phone, href: personalInfo.socialLinks.whatsapp, Icon: SiWhatsapp, external: true },
  { id: 'phone', name: 'Call', detail: personalInfo.phone, href: personalInfo.socialLinks.phone, Icon: FiPhone },
  { id: 'github', name: 'GitHub', detail: 'raaaaz123', href: personalInfo.socialLinks.github, Icon: SiGithub, external: true },
];

/** Every way to reach me, in one place. Opened by every "Hire me" / "Get in touch". */
const ContactDialog: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const { trackEvent } = useAnalytics();
  const [copied, setCopied] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const restore = useRef<HTMLElement | null>(null);

  // Escape to close, Tab kept inside, page scroll paused behind it.
  useEffect(() => {
    if (!open) return;
    restore.current = document.activeElement as HTMLElement;
    const lenis = (window as unknown as { __lenis?: { stop(): void; start(): void } }).__lenis;
    lenis?.stop();
    document.body.style.overflow = 'hidden';
    const t = setTimeout(() => panel.current?.querySelector<HTMLElement>('a,button')?.focus(), 60);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') return onClose();
      if (e.key !== 'Tab' || !panel.current) return;
      const f = panel.current.querySelectorAll<HTMLElement>('a[href], button');
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      lenis?.start();
      clearTimeout(t);
      restore.current?.focus?.();
    };
  }, [open, onClose]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopied(true);
      trackEvent('email_copy', { from: 'contact_dialog' });
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = personalInfo.socialLinks.email;
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[80] flex items-end justify-center bg-ink/60 backdrop-blur-sm sm:items-center sm:p-6"
          onClick={onClose}
        >
          <motion.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-title"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ duration: 0.35, ease }}
            onClick={(e) => e.stopPropagation()}
            data-lenis-prevent
            className="max-h-[92svh] w-full max-w-lg overflow-y-auto rounded-t-[24px] border-[1.5px] border-ink bg-paper p-5 text-ink shadow-[8px_8px_0_0_hsl(var(--pop))] sm:rounded-[24px] sm:p-7"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 id="contact-title" className="display text-[44px]">
                  Get in touch
                </h2>
                <p className="mt-1 flex items-center gap-2 text-[14px] text-muted-foreground">
                  <span className="h-2 w-2 rounded-full bg-pop ring-2 ring-ink/10" aria-hidden="true" />
                  Available now for AI & full-stack roles
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-[1.5px] border-ink transition-colors hover:bg-ink hover:text-paper"
              >
                <FiX aria-hidden="true" />
              </button>
            </div>

            <ul className="mt-6 space-y-2">
              {CHANNELS.map(({ id, name, detail, href, Icon, external }) => (
                <li key={id} className="flex items-stretch gap-2">
                  <a
                    href={href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                    onClick={() => trackEvent('contact_channel', { channel: id })}
                    className="group flex min-w-0 flex-1 items-center gap-4 rounded-2xl border-[1.5px] border-ink/15 p-3 transition-colors hover:border-ink hover:bg-pop"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ink text-[19px] text-paper">
                      <Icon aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[16px] font-bold">{name}</span>
                      <span className="block truncate text-[14px] text-muted-foreground group-hover:text-ink/80">
                        {detail}
                      </span>
                    </span>
                    <FiArrowUpRight className="shrink-0 text-[18px] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  </a>
                  {id === 'email' && (
                    <button
                      type="button"
                      onClick={copy}
                      aria-live="polite"
                      aria-label={copied ? 'Email copied' : 'Copy email address'}
                      className="flex w-14 shrink-0 flex-col items-center justify-center gap-0.5 rounded-2xl border-[1.5px] border-ink/15 text-[11px] font-semibold transition-colors hover:border-ink hover:bg-ink hover:text-paper"
                    >
                      {copied ? <FiCheck className="text-[17px]" aria-hidden="true" /> : <FiCopy className="text-[17px]" aria-hidden="true" />}
                      {copied ? 'Copied' : 'Copy'}
                    </button>
                  )}
                </li>
              ))}
            </ul>

            <a
              href={personalInfo.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('resume_view', { from: 'contact_dialog' })}
              className="pill mt-5 w-full gap-2 border-[1.5px] border-ink bg-ink text-paper hover:bg-pop hover:text-ink"
            >
              <FiDownload aria-hidden="true" />
              Download résumé (PDF)
            </a>
            <p className="mt-3 text-center text-[13px] text-muted-foreground">
              {personalInfo.location} · open to remote and relocation
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactDialog;
