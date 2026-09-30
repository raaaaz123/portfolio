/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        hairline: 'hsl(var(--hairline))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        muted: {
          foreground: 'hsl(var(--muted-foreground))',
        },
        ink: 'hsl(var(--ink) / <alpha-value>)',
        paper: 'hsl(var(--paper) / <alpha-value>)',
        pop: 'hsl(var(--pop) / <alpha-value>)',
        mint: 'hsl(var(--mint) / <alpha-value>)',
        sun: 'hsl(var(--sun) / <alpha-value>)',
        moss: 'hsl(var(--moss) / <alpha-value>)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['Archivo', 'system-ui', 'sans-serif'],
        display: ['Archivo', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}
