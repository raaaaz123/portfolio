import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { PostHogProvider } from 'posthog-js/react'

const options = {
  api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
  // Pageviews, page leaves and autocapture with current PostHog defaults.
  defaults: '2025-05-24' as const,
  person_profiles: 'identified_only' as const,
  // Session replay also needs to be on in PostHog project settings.
  disable_session_recording: false,
  session_recording: { maskAllInputs: true },
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PostHogProvider apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY} options={options}>
      <App />
    </PostHogProvider>
  </React.StrictMode>,
)
