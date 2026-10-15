import { useEffect, useState } from 'react';
import { personalInfo } from '../data/personalInfo';
import useAnalytics from '../hooks/usePostHog';

const istTime = () =>
  new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' });

const Contact: React.FC = () => {
  const { trackEvent } = useAnalytics();
  const [copied, setCopied] = useState(false);
  const [time, setTime] = useState(istTime);

  useEffect(() => {
    const t = setInterval(() => setTime(istTime()), 30_000);
    return () => clearInterval(t);
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopied(true);
      trackEvent('email_copy', { from: 'contact' });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = personalInfo.socialLinks.email;
    }
  };

  const ext = (name: string, href: string) => (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="a"
      onClick={() => trackEvent('social_click', { channel: name })}
    >
      {name}
    </a>
  );

  return (
    <>
      <section id="contact" className="page pb-10 pt-8">
        <div className="rounded-[28px] bg-[#14161a] px-7 py-14 text-white sm:px-14 sm:py-20 dark:bg-surface">
          <h2 className="max-w-[18ch] text-[34px] font-semibold leading-[1.08] tracking-[-0.03em] sm:text-[52px]">
            Building something? I’d like to hear about it.
          </h2>
          <p className="mt-5 max-w-text text-[17px] text-white/65">
            Email is the quickest way to reach me. A couple of lines about the product and the timeline is plenty, and I
            usually reply within a day.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href={personalInfo.socialLinks.email}
              className="btn bg-white text-[#14161a] hover:bg-white/85"
              onClick={() => trackEvent('cta_click', { cta: 'contact_email' })}
            >
              {personalInfo.email}
            </a>
            <button
              type="button"
              onClick={copy}
              className="btn border border-white/20 text-white hover:border-white/50"
              aria-live="polite"
            >
              {copied ? 'Copied' : 'Copy address'}
            </button>
          </div>

          <p className="mt-10 text-[15px] text-white/65">
            Also on {ext('LinkedIn', personalInfo.socialLinks.linkedin)}, {ext('GitHub', personalInfo.socialLinks.github)}{' '}
            and {ext('WhatsApp', personalInfo.socialLinks.whatsapp)}.
          </p>
        </div>
      </section>

      <footer className="page flex flex-wrap justify-between gap-x-6 gap-y-1 pb-10 text-[14px] text-muted">
        <p>
          © {new Date().getFullYear()} Rasheed M{' '}
          <span className="font-mono text-[12.5px] opacity-80">· built with React, Three.js and Framer Motion</span>
        </p>
        <p>
          It’s {time} in {personalInfo.location.split(',')[0]} right now.
        </p>
      </footer>
    </>
  );
};

export default Contact;
