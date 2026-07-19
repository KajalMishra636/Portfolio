import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { journey } from '../data/portfolioData'

export default function Timeline() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section id="journey" className="relative mx-auto w-[min(1100px,92vw)] py-28">
      <p className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-cyan">// ai journey</p>
      <h2 className="mb-12 font-display text-4xl font-bold sm:text-5xl">From first commit to ML</h2>

      <div className="relative border-l border-white/10 pl-8">
        {journey.map((item, i) => {
          const isOpen = openIndex === i
          return (
            <motion.div
              key={`${item.year}-${item.title}`}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="relative mb-6 last:mb-0"
            >
              <span className="absolute -left-[38px] top-1.5 h-3 w-3 rounded-full bg-cyan shadow-glow" />
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full rounded-xl glass px-5 py-4 text-left transition hover:border-cyan/30"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <span className="font-mono text-xs text-cyan">{item.year}</span>
                    <h3 className="font-display text-lg font-semibold">{item.title}</h3>
                  </div>
                  <span className="font-mono text-xs text-muted">{isOpen ? '−' : '+'}</span>
                </div>
                <AnimatePresence>
                  {isOpen && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-2 overflow-hidden text-sm text-muted"
                    >
                      {item.detail}
                    </motion.p>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
