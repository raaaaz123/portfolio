import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import Navbar from './components/Navbar'
import { navLinks } from './lib/ui'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Contact from './components/Contact'
import HireDialog from './components/HireDialog'
import Footer from './components/Footer'

const sectionIds = navLinks.map((l) => l.href.slice(1))

function App() {
  const [activeSection, setActiveSection] = useState('')
  const [hireOpen, setHireOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 220, damping: 40, restDelta: 0.001 })

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

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <motion.div
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-primary"
        aria-hidden="true"
      />
      <Navbar activeSection={activeSection} />
      <main>
        <Hero onHire={() => setHireOpen(true)} />
        <Projects />
        <Experience />
        <Skills />
        <Contact onHire={() => setHireOpen(true)} />
      </main>
      <Footer />
      <HireDialog open={hireOpen} onClose={() => setHireOpen(false)} />
    </div>
  )
}

export default App
