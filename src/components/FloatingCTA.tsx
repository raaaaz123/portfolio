import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { openHire } from '../lib/ui';
import useAnalytics from '../hooks/usePostHog';
import { Magnetic } from './fx';

/** Hire pill that follows the reader once the hero is gone, and steps aside at Contact. */
const FloatingCTA = () => {
  const { trackEvent } = useAnalytics();
  const [show, setShow] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const pastHero = window.scrollY > window.innerHeight * 0.8;
      const contact = document.getElementById('contact');
      const atContact = contact ? contact.getBoundingClientRect().top < window.innerHeight * 0.8 : false;
      setShow(pastHero && !atContact);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 24 }}
          className="fixed bottom-5 right-5 z-50 sm:bottom-7 sm:right-7"
        >
          <Magnetic strength={0.25}>
            <button
              type="button"
              onClick={() => {
                trackEvent('hire_open', { from: 'floating' });
                openHire();
              }}
              className="flex items-center gap-3 rounded-full border-[1.5px] border-ink bg-ink py-2 pl-2 pr-5 text-[15px] font-semibold text-paper shadow-[0_12px_40px_-10px_rgba(0,0,0,0.5)] transition-colors hover:bg-pop hover:text-ink"
            >
              <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-pop text-ink">
                <span className="absolute inset-0 animate-ping rounded-full bg-pop opacity-40" />
                <span className="display relative text-[15px] [--wdth:100]">AI</span>
              </span>
              Available — hire me
            </button>
          </Magnetic>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingCTA;
