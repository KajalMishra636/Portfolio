import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import BootScreen from './components/BootScreen'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import SkillGalaxy from './components/SkillGalaxy'
import Timeline from './components/Timeline'
import Projects from './components/Projects'
import Contact from './components/Contact'
import AICompanion from './components/AICompanion'
import ThemeSwitcher from './components/ThemeSwitcher'
import useEasterEggs from './useEasterEggs'
import { themes } from './data/portfolioData'

export default function App() {
  const [booted, setBooted] = useState(false)
  const [theme, setTheme] = useState(themes[0])
  const glowRef = useRef(null)
  const { message, hologramMode } = useEasterEggs()

  useEffect(() => {
    function onMove(e) {
      if (glowRef.current) {
        glowRef.current.style.left = `${e.clientX}px`
        glowRef.current.style.top = `${e.clientY}px`
      }
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div
      className="relative min-h-screen"
      style={{
        '--accent': theme.accent,
        '--accent2': theme.accent2,
        backgroundColor: theme.bg,
        filter: hologramMode ? 'hue-rotate(180deg) saturate(1.4) contrast(1.1)' : 'none',
        transition: 'filter 0.6s ease',
      }}
    >
      <BootScreen onDone={() => setBooted(true)} />
      <div ref={glowRef} className="cursor-glow" style={{ background: `radial-gradient(circle, ${theme.accent}22 0%, transparent 70%)` }} />

      <AnimatePresence>
        {booted && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
            <Navbar onNavigate={scrollTo} />
            <main className="relative">
              <Hero onNavigate={scrollTo} accent={theme.accent} />
              <About />
              <SkillGalaxy />
              <Timeline />
              <Projects />
              <Contact />
            </main>
            <footer className="border-t border-white/10 py-8 text-center font-mono text-xs text-muted">
              © {new Date().getFullYear()} Kajal Mishra — built with React, Tailwind & Framer Motion.
            </footer>

            <AICompanion onNavigate={scrollTo} accent={theme.accent} />
            <ThemeSwitcher theme={theme} setTheme={setTheme} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 z-[200] -translate-x-1/2 rounded-full glass px-5 py-2 font-mono text-sm text-cyan shadow-glow"
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
