import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import { MotionConfig } from 'framer-motion'
import { navLinks, OPEN_PROJECT_EVENT } from './lib/ui'
import { projects } from './data/projects'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Work from './components/Work'
import Experience from './components/Experience'
import Stack from './components/Stack'
import Awards from './components/Awards'
import Contact from './components/Contact'
import ProjectDrawer from './components/ProjectDrawer'
import CommandMenu from './components/CommandMenu'
import ChatProvider from './components/ChatProvider'
import ChatDock from './components/ChatDock'
import useAnalytics from './hooks/usePostHog'

// The WebGL backdrop is decorative, so it loads after the page and only where WebGL works.
const BinaryField = lazy(() => import('./components/BinaryField'))
const hasWebGL = (() => {
  try {
    return !!document.createElement('canvas').getContext('webgl2')
  } catch {
    return false
  }
})()

const sectionIds = navLinks.map((l) => l.href.slice(1))

function App() {
  const { trackEvent } = useAnalytics()
  const [active, setActive] = useState('')
  const [projectId, setProjectId] = useState<number | null>(null)
  const closeProject = useCallback(() => setProjectId(null), [])

  // Project drawer can be opened from anywhere on the page.
  useEffect(() => {
    const onProject = (e: Event) => {
      const id = (e as CustomEvent<number>).detail
      setProjectId(id)
      trackEvent('project_open', { project: projects.find((p) => p.id === id)?.title })
    }
    window.addEventListener(OPEN_PROJECT_EVENT, onProject)
    return () => window.removeEventListener(OPEN_PROJECT_EVENT, onProject)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // A hello for anyone who opens DevTools.
  useEffect(() => {
    console.log(
      '%cHey, fellow dev 👋%c\nIf you are reading this, we should probably work together.\n→ rasheedmm1000@gmail.com  ·  press ⌘K on the page for shortcuts',
      'font: 600 15px system-ui; color: #34d399; background: #111; padding: 6px 10px; border-radius: 6px',
      'font: 13px system-ui; color: inherit',
    )
  }, [])

  // Scroll spy: the section crossing a line one third down the viewport wins.
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const line = window.innerHeight / 3
      let current = ''
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= line) current = id
      }
      setActive(current)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <ChatProvider>
      <MotionConfig reducedMotion="user">
        {hasWebGL && (
          <Suspense fallback={null}>
            <BinaryField />
          </Suspense>
        )}
        <div className="relative min-h-screen">
          <Nav active={active} />
          <main>
            <Hero />
            <Work />
            <Experience />
            <Stack />
            <Awards />
            <Contact />
          </main>
          <CommandMenu />
          <ChatDock />
          <ProjectDrawer project={projects.find((p) => p.id === projectId) ?? null} onClose={closeProject} />
        </div>
      </MotionConfig>
    </ChatProvider>
  )
}

export default App
