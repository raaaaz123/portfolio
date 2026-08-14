import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalInfo } from '../data/personalInfo';
import { ease } from '../lib/ui';
import useAnalytics from '../hooks/usePostHog';

const INTERESTS = [
  'Full-time role',
  'Contract / freelance',
  'AI consulting',
  'Build a product',
  'Something else',
] as const;

interface Enquiry {
  name: string;
  email: string;
  company: string;
  interest: string;
  message: string;
}

/**
 * No form backend and no third-party relay: the dialog collects the details,
 * composes the message, then hands it to whichever channel the visitor picks
 * already filled in. Nothing leaves the page until they choose.
 */
const compose = (d: Enquiry) => {
  // Interest is a labelled field rather than part of a sentence — every option
  // then reads correctly, including ones like "Build a product".
  const lines = [
    `Hi ${personalInfo.name.split(' ')[0]},`,
    '',
    `Name: ${d.name}`,
    `Email: ${d.email}`,
  ];
  if (d.company) lines.push(`Company: ${d.company}`);
  lines.push(`Interest: ${d.interest}`, '', d.message);
  return lines.join('\n');
};

const field =
  'w-full rounded-md border border-hairline bg-background/60 px-3 py-2 text-[13px] text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-primary/60 focus:outline-none';

const HireDialog: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const { trackEvent } = useAnalytics();
  const [enquiry, setEnquiry] = useState<Enquiry | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const restoreFocusTo = useRef<HTMLElement | null>(null);

  // Escape to close, Tab kept inside the panel, scroll locked behind it.
  useEffect(() => {
    if (!open) return;

    restoreFocusTo.current = document.activeElement as HTMLElement;
    document.body.style.overflow = 'hidden';
    const t = setTimeout(() => firstFieldRef.current?.focus(), 80);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, select, textarea',
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

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
      clearTimeout(t);
      restoreFocusTo.current?.focus?.();
    };
  }, [open, onClose]);

  // Back to a blank form the next time it opens.
  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => setEnquiry(null), 250);
      return () => clearTimeout(t);
    }
  }, [open]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as unknown as Enquiry & {
      website?: string;
    };

    // Honeypot: bots fill hidden fields, humans never see this one.
    if (data.website) return;

    trackEvent('hire_form_complete', { interest: data.interest });
    setEnquiry(data);
  };

  const send = (channel: 'email' | 'whatsapp') => {
    if (!enquiry) return;
    trackEvent('hire_send', { channel, interest: enquiry.interest });

    const body = compose(enquiry);
    const url =
      channel === 'email'
        ? `mailto:${personalInfo.email}?subject=${encodeURIComponent(
            `Hiring enquiry — ${enquiry.name}`,
          )}&body=${encodeURIComponent(body)}`
        : `${personalInfo.socialLinks.whatsapp}?text=${encodeURIComponent(body)}`;

    window.open(url, channel === 'email' ? '_self' : '_blank', 'noopener,noreferrer');
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="fixed inset-0 z-[80] flex items-end justify-center bg-background/60 p-4 backdrop-blur-md sm:items-center"
          onClick={onClose}
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="hire-title"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.35, ease }}
            onClick={(e) => e.stopPropagation()}
            className="glass max-h-[90svh] w-full max-w-md overflow-y-auto rounded-2xl p-6 sm:p-7"
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h2 id="hire-title" className="font-display text-2xl font-light text-foreground">
                  {enquiry ? 'How should I get it?' : 'Start a project'}
                </h2>
                <p className="label mt-1.5">
                  {enquiry ? 'Everything is filled in already' : 'Usually replies within a day'}
                </p>
              </div>
              <button
                onClick={onClose}
                className="label -mr-1 -mt-1 rounded-full px-2 py-1 hover:text-foreground"
                aria-label="Close"
              >
                Esc
              </button>
            </div>

            {enquiry ? (
              <div className="space-y-5">
                {/* What they are about to send, so nothing is a surprise */}
                <pre className="max-h-40 overflow-y-auto whitespace-pre-wrap rounded-md border border-hairline bg-background/50 p-3 font-mono text-[11.5px] leading-relaxed text-muted-foreground">
                  {compose(enquiry)}
                </pre>

                <div className="grid gap-3 sm:grid-cols-2">
                  <motion.button
                    type="button"
                    onClick={() => send('email')}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.25, ease }}
                    className="sheen rounded-full bg-foreground px-5 py-3 text-[12px] font-medium tracking-wide text-background"
                  >
                    Send by email
                  </motion.button>

                  <motion.button
                    type="button"
                    onClick={() => send('whatsapp')}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.25, ease }}
                    className="glass sheen rounded-full px-5 py-3 text-[12px] font-medium tracking-wide text-foreground"
                  >
                    Send on WhatsApp
                  </motion.button>
                </div>

                <button
                  type="button"
                  onClick={() => setEnquiry(null)}
                  className="label link-underline block hover:text-foreground"
                >
                  ← Edit details
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* honeypot */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="label mb-1.5 block">Name *</span>
                    <input
                      ref={firstFieldRef}
                      required
                      name="name"
                      autoComplete="name"
                      className={field}
                      placeholder="Your name"
                    />
                  </label>
                  <label className="block">
                    <span className="label mb-1.5 block">Email *</span>
                    <input
                      required
                      type="email"
                      name="email"
                      autoComplete="email"
                      className={field}
                      placeholder="you@company.com"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="label mb-1.5 block">Company</span>
                  <input
                    name="company"
                    autoComplete="organization"
                    className={field}
                    placeholder="Optional"
                  />
                </label>

                <label className="block">
                  <span className="label mb-1.5 block">Interest *</span>
                  <select required name="interest" defaultValue="" className={field}>
                    <option value="" disabled>
                      Pick one…
                    </option>
                    {INTERESTS.map((i) => (
                      <option key={i} value={i}>
                        {i}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="label mb-1.5 block">What do you need built? *</span>
                  <textarea
                    required
                    name="message"
                    rows={4}
                    className={`${field} resize-none`}
                    placeholder="A few lines on the project, timeline and budget."
                  />
                </label>

                <button
                  type="submit"
                  className="sheen w-full rounded-full bg-foreground px-6 py-3 text-[12px] font-medium tracking-wide text-background transition-opacity hover:opacity-90"
                >
                  Continue
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HireDialog;
