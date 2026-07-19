import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { roles } from '../data/portfolioData'
import ParticleField from './ParticleField'

function useTypewriter(words, speed = 65, pause = 1400) {
  const [text, setText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[wordIndex % words.length]
    let timeout

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && text === '') {
      setDeleting(false)
      setWordIndex((i) => i + 1)
    } else {
      timeout = setTimeout(() => {
        setText((t) => (deleting ? current.slice(0, t.length - 1) : current.slice(0, t.length + 1)))
      }, deleting ? speed / 2 : speed)
    }
    return () => clearTimeout(timeout)
  }, [text, deleting, wordIndex, words, speed, pause])

  return text
}

export default function Hero({ onNavigate, accent }) {
  const typed = useTypewriter(roles)

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-28">
      <div className="absolute inset-0 grid-overlay opacity-60" />
      <ParticleField accent={accent} />

      <div className="relative z-10 mx-auto w-[min(1100px,92vw)]">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-cyan"
        >
          // intelligent developer workspace
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="font-display text-[13vw] font-bold leading-[0.95] tracking-tight sm:text-[9vw] lg:text-[6.5vw]"
        >
          KAJAL
          <br />
          <span className="text-gradient">MISHRA</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 h-8 font-mono text-lg text-muted sm:text-xl"
        >
          <span className="text-ink">{typed}</span>
          <span className="blink-cursor ml-1 h-5 align-middle" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-6 max-w-xl text-muted"
        >
          More than a portfolio — an intelligent developer workspace built with React, Python AI
          experiments, and modern web technologies.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
          className="mt-9 flex flex-wrap gap-3"
        >
          <button
            onClick={() => onNavigate('projects')}
            className="rounded-full bg-gradient-to-r from-cyan to-violet px-6 py-3 font-mono text-sm font-semibold text-void shadow-glow transition hover:scale-[1.03]"
          >
            Explore Portfolio
          </button>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('open-ai-companion'))}
            className="rounded-full border border-cyan/30 px-6 py-3 font-mono text-sm text-cyan transition hover:bg-cyan/10"
          >
            Talk with AI
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className="rounded-full border border-white/10 px-6 py-3 font-mono text-sm text-muted transition hover:border-white/30 hover:text-ink"
          >
            Download Resume
          </button>
        </motion.div>
      </div>
    </section>
  )
}
