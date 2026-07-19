import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiDroplet } from 'react-icons/fi'
import { themes } from '../data/portfolioData'

export default function ThemeSwitcher({ theme, setTheme }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-7 left-7 z-50">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Change theme"
        className="flex h-12 w-12 items-center justify-center rounded-full glass text-cyan shadow-glow"
      >
        <FiDroplet />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-16 left-0 w-56 rounded-2xl glass p-3"
          >
            <p className="mb-2 px-1 font-mono text-[10px] uppercase tracking-widest text-muted">Theme engine</p>
            <div className="flex flex-col gap-1">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setTheme(t)
                    setOpen(false)
                  }}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition ${
                    theme.id === t.id ? 'bg-white/10 text-ink' : 'text-muted hover:bg-white/5'
                  }`}
                >
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ background: `linear-gradient(135deg, ${t.accent}, ${t.accent2})` }}
                  />
                  {t.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
