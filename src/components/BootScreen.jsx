import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LINES = [
  'Initializing Kajal AI OS...',
  'Loading neural engine...',
  'Connecting projects...',
  'Loading experience...',
  'AI assistant activated...',
  'Welcome, Kajal Mishra.',
]

export default function BootScreen({ onDone }) {
  const [visibleLines, setVisibleLines] = useState(0)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    if (visibleLines < LINES.length) {
      const t = setTimeout(() => setVisibleLines((v) => v + 1), visibleLines === 0 ? 250 : 420)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setExiting(true), 500)
    return () => clearTimeout(t)
  }, [visibleLines])

  useEffect(() => {
    if (exiting) {
      const t = setTimeout(onDone, 700)
      return () => clearTimeout(t)
    }
  }, [exiting, onDone])

  const progress = Math.min(100, Math.round((visibleLines / LINES.length) * 100))

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          exit={{ opacity: 0, filter: 'blur(8px)' }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-void grid-overlay"
        >
          <div className="w-[min(560px,90vw)] font-mono text-sm">
            <div className="mb-6 flex items-center gap-2 text-cyan">
              <span className="h-2 w-2 rounded-full bg-cyan animate-pulse" />
              KAJAL_AI_OS v2.6.0
            </div>
            <div className="space-y-2">
              {LINES.slice(0, visibleLines).map((line, i) => (
                <motion.div
                  key={line}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={i === LINES.length - 1 ? 'text-gradient font-semibold' : 'text-muted'}
                >
                  <span className="text-cyan/70">{'>'}</span> {line}
                </motion.div>
              ))}
            </div>
            <div className="mt-8 h-1 w-full overflow-hidden rounded-full bg-panel">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan to-violet"
                animate={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>
            <div className="mt-2 text-right text-xs text-muted">{progress}%</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
