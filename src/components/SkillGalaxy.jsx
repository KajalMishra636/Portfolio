import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { skills } from '../data/portfolioData'

export default function SkillGalaxy() {
  const [active, setActive] = useState(null)

  return (
    <section id="skills" className="relative mx-auto w-[min(1100px,92vw)] py-28">
      <p className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-cyan">// skill galaxy</p>
      <h2 className="mb-4 font-display text-4xl font-bold sm:text-5xl">Orbiting the stack</h2>
      <p className="mb-12 max-w-xl text-muted">
        Each planet is a skill. Click one to see how deep the orbit goes.
      </p>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {skills.map((s, i) => (
          <motion.button
            key={s.name}
            onClick={() => setActive(s)}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, type: 'spring', stiffness: 200 }}
            whileHover={{ y: -6 }}
            className="group relative flex aspect-square flex-col items-center justify-center rounded-full glass p-4 text-center"
          >
            <div
              className="absolute inset-3 rounded-full opacity-30 blur-lg transition group-hover:opacity-60"
              style={{
                background: `conic-gradient(from 0deg, #4ce0d2, #8b7cf6, #4ce0d2)`,
              }}
            />
            <span className="relative font-display text-sm font-semibold sm:text-base">{s.name}</span>
            <span className="relative mt-1 font-mono text-[10px] text-muted">{s.level}%</span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-void/80 p-6 backdrop-blur-sm"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-[min(420px,92vw)] rounded-2xl glass p-6"
            >
              <p className="font-mono text-[10px] uppercase tracking-widest text-cyan">{active.category}</p>
              <h3 className="mt-1 font-display text-2xl font-bold">{active.name}</h3>
              <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-panel">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan to-violet"
                  style={{ width: `${active.level}%` }}
                />
              </div>
              <p className="mt-2 font-mono text-xs text-muted">{active.level}% confidence</p>
              <p className="mt-4 text-sm leading-relaxed text-ink/90">{active.note}</p>
              <button
                onClick={() => setActive(null)}
                className="mt-6 rounded-full border border-white/10 px-4 py-2 font-mono text-xs text-muted hover:text-ink"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
