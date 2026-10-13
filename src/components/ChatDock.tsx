import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useChat } from '../hooks/useChat';
import AskAI from './AskAI';

/**
 * Keeps the assistant one click away. The launcher shows once the hero chat
 * has scrolled out of view; the panel shares the same conversation.
 */
const ChatDock: React.FC = () => {
  const { dockOpen, setDockOpen, turns } = useChat();
  const [heroVisible, setHeroVisible] = useState(true);

  useEffect(() => {
    const el = document.getElementById('hero-chat');
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setHeroVisible(e.isIntersecting), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!dockOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setDockOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [dockOpen, setDockOpen]);

  return (
    <>
      <AnimatePresence>
        {!dockOpen && !heroVisible && (
          <motion.button
            type="button"
            onClick={() => setDockOpen(true)}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-5 right-5 z-40 flex items-center gap-2.5 rounded-full bg-[#14161a] py-3 pl-4 pr-5 text-[15px] font-medium text-white shadow-[0_16px_40px_-12px_rgb(0_0_0/0.5)] ring-1 ring-white/10 hover:bg-black"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {turns.length ? 'Continue the chat' : 'Ask about my work'}
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {dockOpen && (
          <motion.div
            role="dialog"
            aria-label="Ask my portfolio"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: 'bottom right' }}
            className="fixed inset-x-2 bottom-2 z-50 h-[82vh] shadow-[0_30px_80px_-20px_rgb(0_0_0/0.55)] sm:inset-x-auto sm:bottom-5 sm:right-5 sm:h-[min(640px,85vh)] sm:w-[420px]"
          >
            <AskAI variant="dock" onClose={() => setDockOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatDock;
