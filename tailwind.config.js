/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F9F9F8',
          100: '#F1F1EF',
          200: '#E6E6E3',
          300: '#D1D1CC',
          400: '#A8A8A3',
          500: '#787774', // Notion gray
          600: '#373530', // Main Notion text color
          700: '#2D2B26',
          800: '#24221E',
          900: '#1A1816',
          950: '#0F0E0C',
          DEFAULT: '#373530', // Notion primary text
        },
        notion: {
          // Light mode colors
          'default-bg': '#FFFFFF',
          'default-text': '#373530',
          'gray-bg': '#F1F1EF',
          'gray-text': '#787774',
          'blue-bg': '#E9F3F7',
          'blue-text': '#487CA5',
          'green-bg': '#EEF3ED',
          'green-text': '#548164',
          // Dark mode colors
          'dark-bg': '#191919',
          'dark-text': '#D4D4D4',
          'dark-gray-bg': '#252525',
          'dark-gray-text': '#9B9B9B',
          'dark-blue-bg': '#1F282D',
          'dark-blue-text': '#447ACB',
          'dark-green-bg': '#242B26',
          'dark-green-text': '#4F9768',
        },
        background: {
          light: '#FFFFFF',
          default: '#F1F1EF',
          darker: '#E6E6E3',
        },
        text: {
          primary: '#373530',
          secondary: '#787774',
        },
        secondary: "#191919",
        dark: {
          bg: {
            primary: '#191919',
            secondary: '#252525',
            tertiary: '#2D2B26',
          },
          text: {
            primary: '#D4D4D4',
            secondary: '#9B9B9B',
            tertiary: '#787774',
          },
          border: '#9B9B9B',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}