import { useTheme } from '../contexts/ThemeContext';

/** Mono text switch — reads as part of the type system rather than a UI chip. */
const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="label tabular-nums transition-colors hover:text-foreground"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <span className={theme === 'light' ? 'text-foreground' : ''}>day</span>
      <span className="mx-1 text-muted-foreground/50">/</span>
      <span className={theme === 'dark' ? 'text-foreground' : ''}>night</span>
    </button>
  );
};

export default ThemeToggle;
