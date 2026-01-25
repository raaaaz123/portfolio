import { motion } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-all duration-300 border border-border"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div className="relative w-6 h-6 flex items-center justify-center">
        <motion.div
          initial={false}
          animate={{
            scale: theme === 'light' ? 1 : 0,
            rotate: theme === 'light' ? 0 : 180,
            opacity: theme === 'light' ? 1 : 0,
          }}
          transition={{
            duration: 0.3,
            ease: 'easeInOut',
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <FiSun className="w-5 h-5 text-foreground" />
        </motion.div>

        <motion.div
          initial={false}
          animate={{
            scale: theme === 'dark' ? 1 : 0,
            rotate: theme === 'dark' ? 0 : -180,
            opacity: theme === 'dark' ? 1 : 0,
          }}
          transition={{
            duration: 0.3,
            ease: 'easeInOut',
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <FiMoon className="w-5 h-5 text-foreground" />
        </motion.div>
      </div>
    </motion.button>
  );
};

export default ThemeToggle;