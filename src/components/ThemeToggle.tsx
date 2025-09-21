import { motion } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 border border-gray-200 dark:border-gray-600"
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
          <FiSun className="w-5 h-5 text-gray-700 dark:text-gray-300" />
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
          <FiMoon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </motion.div>
      </div>
      
      {/* Subtle glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          boxShadow: theme === 'dark' 
            ? '0 0 20px rgba(107, 114, 128, 0.3)' 
            : '0 0 20px rgba(107, 114, 128, 0.3)',
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
};

export default ThemeToggle;