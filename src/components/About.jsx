import { motion } from 'framer-motion'
import { funFacts } from '../data/portfolioData'

const CARDS = [
  { title: 'Who I Am', body: 'A frontend-first engineer who treats interfaces like products — obsessing over motion, state, and the small details that make software feel alive.' },
  { title: 'Mission', body: 'Build software that feels intelligent without feeling gimmicky — interfaces that anticipate what people need next.' },
  { title: 'Developer Philosophy', body: 'Ship small, ship often, and never let an animation slow down a real user task.' },
  { title: 'Vision', body: 'Move from building interfaces for AI features to building AI-native products end to end.' },
]

export default function About() {
  return (
    <section id="about" className="relative mx-auto w-[min(1100px,92vw)] py-28">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-cyan"
      >
        // about
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 font-display text-4xl font-bold sm:text-5xl"
      >
        The engineer behind the OS
      </motion.h2>

      <div className="grid gap-4 sm:grid-cols-2">
        {CARDS.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="rounded-2xl glass p-6 transition hover:border-cyan/30"
          >
            <h3 className="mb-2 font-display text-lg font-semibold text-cyan">{c.title}</h3>
            <p className="text-sm leading-relaxed text-muted">{c.body}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-4">
        {funFacts.map((f, i) => (
          <motion.div
            key={f.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="rounded-xl border border-white/10 bg-panel/60 p-4"
          >
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted">{f.label}</p>
            <p className="mt-1 text-sm font-medium text-ink">{f.value}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
