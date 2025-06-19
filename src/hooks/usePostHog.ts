import posthog from 'posthog-js'
import { usePostHog } from 'posthog-js/react'

export const useAnalytics = () => {
  const client = usePostHog()

  const trackEvent = (eventName: string, properties?: Record<string, any>) => {
    if (client) {
      client.capture(eventName, properties)
    }
  }

  return {
    trackEvent
  }
}

export default useAnalytics 