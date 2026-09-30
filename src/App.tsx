import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import Lenis from 'lenis'
import Navbar from './components/Navbar'
import { HIRE_EVENT, navLinks, OPEN_PROJECT_EVENT } from './lib/ui'
import { projects } from './data/projects'
import Loader from './components/Loader'
import Hero from './components/Hero'
import TechMarquee from './components/TechMarquee'
import Manifesto from './components/Manifesto'
import Featured from './components/Featured'
import CaseStudies from './components/CaseStudies'
import Numbers from './components/Numbers'
import Projects, { ProjectSheet } from './components/Projects'
import Awards from './components/Awards'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Contact from './components/Contact'
import ContactDialog from './components/ContactDialog'
import CommandMenu from './components/CommandMenu'
import FloatingCTA from './components/FloatingCTA'
import useAnalytics from './hooks/usePostHog'

const sectionIds = navLinks.map((l) => l.href.slice(1))

// The boot intro plays once per tab session, and never for reduced motion.
const shouldIntro = () => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  try {
    if (sessionStorage.getItem('intro-seen')) return false
    sessionStorage.setItem('intro-seen', '1')
  } catch {
    /* storage blocked: just play it */
  }
  return true
}

function App() {
  const { trackEvent } = useAnalytics()
  const [intro] = useState(shouldIntro)
  const [ready, setReady] = useState(!intro)
  const [activeSection, setActiveSection] = useState('')
  const [hireOpen, setHireOpen] = useState(false)
  const [sheetId, setSheetId] = useState<number | null>(null)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 220, damping: 40, restDelta: 0.001 })
  const onIntroDone = useCallback(() => setReady(true), [])
  const closeHire = useCallback(() => setHireOpen(false), [])

  // Smooth scrolling, skipped entirely for reduced motion.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 })
    ;(window as unknown as { __lenis?: Lenis }).__lenis = lenis
    let id = 0
    const raf = (t: number) => {
      lenis.raf(t)
      id = requestAnimationFrame(raf)
    }
    id = requestAnimationFrame(raf)
    return () => {
      cancelAnimationFrame(id)
      lenis.destroy()
      delete (window as unknown as { __lenis?: Lenis }).__lenis
    }
  }, [])

  // Hire dialog and project sheet can be opened from anywhere on the page.
  useEffect(() => {
    const onProject = (e: Event) => {
      const id = (e as CustomEvent<number>).detail
      setSheetId(id)
      trackEvent('project_open', { project: projects.find((p) => p.id === id)?.title })
    }
    const onHire = () => setHireOpen(true)
    window.addEventListener(OPEN_PROJECT_EVENT, onProject)
    window.addEventListener(HIRE_EVENT, onHire)
    return () => {
      window.removeEventListener(OPEN_PROJECT_EVENT, onProject)
      window.removeEventListener(HIRE_EVENT, onHire)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // A hello for anyone who opens DevTools.
  useEffect(() => {
    console.log(
      '%cHey, fellow dev 👋%c\nIf you are reading this, we should probably work together.\n→ rasheedmm1000@gmail.com  ·  press ⌘K on the page for shortcuts',
      'font: 700 18px system-ui; color: #C8F031; background: #121710; padding: 6px 10px; border-radius: 6px',
      'font: 13px system-ui; color: inherit',
    )
  }, [])

  // Pause page scroll while a sheet is up; Escape closes it.
  useEffect(() => {
    if (sheetId === null) return
    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis
    lenis?.stop()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setSheetId(null)
    window.addEventListener('keydown', onKey)
    return () => {
      lenis?.start()
      window.removeEventListener('keydown', onKey)
    }
  }, [sheetId])

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
      setActiveSection((prev) => (prev === current ? prev : current))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  const sheet = projects.find((p) => p.id === sheetId) ?? null
  const hire = () => setHireOpen(true)

  return (
    <div className="min-h-screen bg-paper text-ink">
      {intro && <Loader onDone={onIntroDone} />}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-pop"
        aria-hidden="true"
      />
      <Navbar activeSection={activeSection} onHire={hire} />
      <main>
        <Hero ready={ready} />
        <TechMarquee />
        <Manifesto />
        <Featured />
        <CaseStudies />
        <Numbers />
        <Projects />
        <Awards />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <FloatingCTA />
      <CommandMenu />
      <AnimatePresence>
        {sheet && <ProjectSheet key={sheet.id} project={sheet} onClose={() => setSheetId(null)} />}
      </AnimatePresence>
      <ContactDialog open={hireOpen} onClose={closeHire} />
    </div>
  )
}

export default App
