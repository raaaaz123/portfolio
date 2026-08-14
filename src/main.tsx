import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { PostHogProvider } from 'posthog-js/react'
import { ThemeProvider } from './contexts/ThemeContext'

// Theme-color for mobile browser chrome, matched to the two palettes.
// (Viewport is declared in index.html — pinch-zoom is left enabled on purpose.)
const setThemeColorMeta = () => {
  const set = (media: string, color: string) => {
    const meta = document.createElement('meta')
    meta.setAttribute('name', 'theme-color')
    meta.setAttribute('media', media)
    meta.setAttribute('content', color)
    document.head.appendChild(meta)
  }

  document.querySelectorAll('meta[name="theme-color"]').forEach((m) => m.remove())
  set('(prefers-color-scheme: light)', '#F8F6F1')
  set('(prefers-color-scheme: dark)', '#131211')
}

setThemeColorMeta()

const options = {
  api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <PostHogProvider
        apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY}
        options={options}
      >
        <App />
      </PostHogProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
