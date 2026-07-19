import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiExternalLink, FiGithub } from 'react-icons/fi'
import { projects } from '../data/portfolioData'

const ALL_TECH = ['All', ...new Set(projects.flatMap((p) => p.stack))]

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const visible = filter === 'All' ? projects : projects.filter((p) => p.stack.includes(filter))

  return (
    <section id="projects" className="relative mx-auto w-[min(1100px,92vw)] py-28">
      <p className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-cyan">// project showcase</p>
      <h2 className="mb-8 font-display text-4xl font-bold sm:text-5xl">Things I've shipped</h2>

      <div className="mb-10 flex flex-wrap gap-2">
        {ALL_TECH.map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`rounded-full border px-4 py-1.5 font-mono text-xs transition ${
              filter === t
                ? 'border-cyan bg-cyan/10 text-cyan'
                : 'border-white/10 text-muted hover:border-white/30 hover:text-ink'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {visible.map((p, i) => (
          <motion.article
            key={p.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ y: -6 }}
            className="group relative overflow-hidden rounded-2xl glass p-6"
          >
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyan/10 blur-2xl transition group-hover:bg-cyan/20" />
            <h3 className="font-display text-xl font-semibold">{p.name}</h3>
            <p className="mt-2 text-sm text-muted">{p.summary}</p>

            <ul className="mt-4 space-y-1">
              {p.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2 text-xs text-ink/80">
                  <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-cyan" />
                  {h}
                </li>
              ))}
            </ul>

            <div className="mt-4 flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <span key={s} className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[10px] text-muted">
                  {s}
                </span>
              ))}
            </div>

            <div className="mt-5 flex gap-4 font-mono text-xs text-cyan">
              <a href={p.demo} className="flex items-center gap-1 hover:text-cyan-soft">
                <FiExternalLink /> Live demo
              </a>
              <a href={p.repo} className="flex items-center gap-1 hover:text-cyan-soft">
                <FiGithub /> Source
              </a>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
