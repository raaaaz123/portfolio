import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { PostHogProvider } from 'posthog-js/react'

// Ensure proper viewport meta tag is set for mobile responsiveness
const setViewportMeta = () => {
  // Check if viewport meta tag exists
  let viewportMeta = document.querySelector('meta[name="viewport"]')
  
  // If it doesn't exist, create it
  if (!viewportMeta) {
    viewportMeta = document.createElement('meta')
    viewportMeta.setAttribute('name', 'viewport')
    document.head.appendChild(viewportMeta)
  }
  
  // Set the content attribute to ensure proper mobile scaling
  viewportMeta.setAttribute(
    'content', 
    'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
  )
}

// Ensure proper theme-color meta for mobile browsers
const setThemeColorMeta = () => {
  let themeColorMeta = document.querySelector('meta[name="theme-color"]')
  
  if (!themeColorMeta) {
    themeColorMeta = document.createElement('meta')
    themeColorMeta.setAttribute('name', 'theme-color')
    document.head.appendChild(themeColorMeta)
  }
  
  // Set theme color to match your primary color
  themeColorMeta.setAttribute('content', '#f97316') // Adjust to match your primary color
}

// Set up meta tags
setViewportMeta()
setThemeColorMeta()

const options = {
  api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PostHogProvider 
      apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY}
      options={options}
    >
      <App />
    </PostHogProvider>
  </React.StrictMode>,
)
