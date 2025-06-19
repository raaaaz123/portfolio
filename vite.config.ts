/// <reference types="node" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {
      VITE_PUBLIC_POSTHOG_KEY: JSON.stringify(process.env.VITE_PUBLIC_POSTHOG_KEY),
      VITE_PUBLIC_POSTHOG_HOST: JSON.stringify(process.env.VITE_PUBLIC_POSTHOG_HOST),
    },
  },
})
