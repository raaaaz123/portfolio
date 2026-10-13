import { useEffect } from 'react';
import { ChatContext, useChatState } from '../hooks/useChat';
import { ASK_EVENT } from '../lib/ui';

/** Holds the shared conversation. ⌘K "Ask" opens the chat panel. */
const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const chat = useChatState();
  const { submit, setDockOpen } = chat;

  useEffect(() => {
    const onAsk = (e: Event) => {
      const q = (e as CustomEvent<string | undefined>).detail;
      setDockOpen(true);
      if (q) submit(q);
    };
    window.addEventListener(ASK_EVENT, onAsk);
    return () => window.removeEventListener(ASK_EVENT, onAsk);
  }, [submit, setDockOpen]);

  return <ChatContext.Provider value={chat}>{children}</ChatContext.Provider>;
};

export default ChatProvider;
