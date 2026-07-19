import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiDownload, FiMail, FiGithub, FiLinkedin } from 'react-icons/fi'

/*
  Client-side "smart" parser. It looks for common patterns (email, budget,
  timeline) in free text so the form still feels intelligent without a
  real backend/LLM call. Wire this up to your FastAPI + OpenAI service
  (see README) to make it a true AI extraction pipeline.
*/
function parseMessage(text) {
  const emailMatch = text.match(/[\w.+-]+@[\w-]+\.[a-zA-Z]{2,}/)
  const budgetMatch = text.match(/\$?\d[\d,]*\s?(k|K|USD|usd)?\s?(budget)?/g)?.find((m) => /\d/.test(m))
  const timelineMatch = text.match(/\b(asap|\d+\s?(days?|weeks?|months?))\b/i)
  const companyMatch = text.match(/at ([A-Z][\w& ]{1,30})/)

  return {
    email: emailMatch?.[0] || null,
    budget: budgetMatch || null,
    timeline: timelineMatch?.[0] || null,
    company: companyMatch?.[1] || null,
  }
}

export default function Contact() {
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('idle') // idle | understanding | generating | sending | done
  const [extracted, setExtracted] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!message.trim()) return
    setStatus('understanding')
    const parsed = parseMessage(message)
    setExtracted(parsed)
    await new Promise((r) => setTimeout(r, 700))
    setStatus('generating')
    await new Promise((r) => setTimeout(r, 700))
    setStatus('sending')
    await new Promise((r) => setTimeout(r, 600))
    setStatus('done')
  }

  const STEPS = {
    understanding: 'Conversation understood.',
    generating: 'Generating response...',
    sending: 'Sending email...',
    done: 'Done — Kajal will reply soon.',
  }

  return (
    <section id="contact" className="relative mx-auto w-[min(1100px,92vw)] py-28">
      <p className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-cyan">// get in touch</p>
      <h2 className="mb-4 font-display text-4xl font-bold sm:text-5xl">Let's build something</h2>
      <p className="mb-10 max-w-xl text-muted">
        Type naturally — "Hi Kajal, I want to hire you for a React project, budget $3k, need it in 3 weeks" — and
        the form will pick out the details.
      </p>

      <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
        <form onSubmit={handleSubmit} className="rounded-2xl glass p-6">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={6}
            placeholder="Hi Kajal, I want to hire you. Need a React developer, budget around $2k, timeline 2 weeks. Reach me at hello@company.com"
            aria-label="Message"
            className="w-full resize-none rounded-xl border border-white/10 bg-panel px-4 py-3 text-sm text-ink placeholder:text-muted focus:outline-none focus:border-cyan/40"
          />

          <button
            type="submit"
            disabled={status !== 'idle' && status !== 'done'}
            className="mt-4 rounded-full bg-gradient-to-r from-cyan to-violet px-6 py-3 font-mono text-sm font-semibold text-void shadow-glow transition hover:scale-[1.02] disabled:opacity-60"
          >
            Send with AI
          </button>

          {status !== 'idle' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 space-y-1 font-mono text-xs text-muted">
              {Object.entries(STEPS).map(([key, label]) => {
                const order = ['understanding', 'generating', 'sending', 'done']
                const reached = order.indexOf(status) >= order.indexOf(key)
                if (!reached) return null
                return (
                  <div key={key} className={key === status ? 'text-cyan' : ''}>
                    ✓ {label}
                  </div>
                )
              })}
            </motion.div>
          )}

          {extracted && (
            <div className="mt-5 grid grid-cols-2 gap-3 border-t border-white/10 pt-4 font-mono text-xs">
              <div>
                <p className="text-muted">Email</p>
                <p className="text-ink">{extracted.email || '—'}</p>
              </div>
              <div>
                <p className="text-muted">Company</p>
                <p className="text-ink">{extracted.company || '—'}</p>
              </div>
              <div>
                <p className="text-muted">Budget</p>
                <p className="text-ink">{extracted.budget || '—'}</p>
              </div>
              <div>
                <p className="text-muted">Timeline</p>
                <p className="text-ink">{extracted.timeline || '—'}</p>
              </div>
            </div>
          )}
        </form>

        <div className="flex flex-col gap-4">
          <div className="rounded-2xl glass p-6">
            <h3 className="mb-4 font-display text-lg font-semibold">Direct links</h3>
            <div className="flex flex-col gap-3 font-mono text-sm">
              <a href="/resume.pdf" download className="flex items-center gap-2 text-cyan hover:text-cyan-soft">
                <FiDownload /> Download résumé
              </a>
              <a href="mailto:hello@kajalmishra.dev" className="flex items-center gap-2 text-muted hover:text-ink">
                <FiMail /> hello@kajalmishra.dev
              </a>
              <a href="https://github.com/" className="flex items-center gap-2 text-muted hover:text-ink">
                <FiGithub /> github.com/kajalmishra
              </a>
              <a href="https://linkedin.com/" className="flex items-center gap-2 text-muted hover:text-ink">
                <FiLinkedin /> linkedin.com/in/kajalmishra
              </a>
            </div>
          </div>
          <div className="rounded-2xl border border-dashed border-white/15 p-6 font-mono text-xs text-muted">
            Tip: try the terminal — type <span className="text-cyan">sudo hire kajal</span> anywhere on the page.
          </div>
        </div>
      </div>
    </section>
  )
}
