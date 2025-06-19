export const colors = {
  // Primary colors - Orange theme
  primary: {
    50: '#fff7ed',
    100: '#ffedd5',
    200: '#fed7aa',
    300: '#fdba74',
    400: '#fb923c',
    500: '#f97316', // Main orange
    600: '#ea580c',
    700: '#c2410c',
    800: '#9a3412',
    900: '#7c2d12',
    950: '#431407',
  },
  
  // Background colors
  background: {
    light: '#ffffff',
    default: '#fafafa',
    darker: '#f5f5f4',
  },
  
  // Text colors
  text: {
    primary: '#1f2937', // Gray-800
    secondary: '#4b5563', // Gray-600
    tertiary: '#6b7280', // Gray-500
    light: '#9ca3af', // Gray-400
  },
  
  // Border colors
  border: {
    light: '#e5e7eb', // Gray-200
    default: '#d1d5db', // Gray-300
  },
  
  // Button colors
  button: {
    primary: '#f97316', // Orange-500
    primaryHover: '#ea580c', // Orange-600
    secondary: '#ffffff',
    secondaryHover: '#f3f4f6', // Gray-100
  },
  
  // Accent colors
  accent: {
    blue: '#3b82f6',
    green: '#10b981',
    red: '#ef4444',
    yellow: '#f59e0b',
  }
};

// CSS variable names for easy use in Tailwind classes
export const colorVariables = {
  primary: 'var(--color-primary)',
  primaryLight: 'var(--color-primary-light)',
  primaryDark: 'var(--color-primary-dark)',
  primaryBackground: 'var(--color-primary-background)',
  
  textPrimary: 'var(--color-text-primary)',
  textSecondary: 'var(--color-text-secondary)',
  
  backgroundLight: 'var(--color-background-light)',
  backgroundDefault: 'var(--color-background-default)',
  backgroundDarker: 'var(--color-background-darker)',
};

// Extended Tailwind color theme
export const tailwindColors = {
  primary: colors.primary[500],
  'primary-light': colors.primary[400],
  'primary-dark': colors.primary[600],
  'primary-background': colors.primary[50],
}; 