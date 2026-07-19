import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSend, FiX } from 'react-icons/fi'
import { skills, projects, funFacts } from '../data/portfolioData'

/*
  Simulated AI assistant.
  There's no live LLM backend wired up here (that needs a server + API key —
  see README for how to connect one via /api/chat). Responses are generated
  with simple intent-matching so the companion is fully functional out of the box.
*/
function generateReply(input, onNavigate) {
  const q = input.toLowerCase()

  if (/who (is|are) kajal|about kajal|who.?s kajal/.test(q)) {
    onNavigate?.('about')
    return "Kajal is a frontend-focused React engineer who's picking up Python & AI engineering — currently exploring RAG pipelines and FastAPI services. I just opened the About section for you."
  }
  if (/react project|show.*project|projects/.test(q)) {
    onNavigate?.('projects')
    return `Opening the project showcase — ${projects.length} projects including "${projects[0].name}" and "${projects[1].name}".`
  }
  if (/resume|cv|download/.test(q)) {
    onNavigate?.('contact')
    return "Kajal's resume is available in the contact section — I've scrolled you there. Look for the download button."
  }
  if (/interview|book|call|hire|meeting/.test(q)) {
    onNavigate?.('contact')
    return "I'd love that. Head to the contact form below — tell me the role and timeline and Kajal will follow up."
  }
  if (/summarize|20 words|short bio/.test(q)) {
    return 'React-focused frontend engineer building intelligent, animated interfaces while learning Python, FastAPI, and applied AI — currently shipping this very portfolio.'
  }
  if (/skill|stack|tech/.test(q)) {
    onNavigate?.('skills')
    return `Core stack: ${skills.slice(0, 5).map((s) => s.name).join(', ')}. Jumping to the skill galaxy now.`
  }
  if (/journey|timeline|experience|history/.test(q)) {
    onNavigate?.('journey')
    return "Kajal's journey runs from first HTML in 2022 to machine learning experiments today. Timeline's on screen now."
  }
  if (/fun fact|hobby|hobbies/.test(q)) {
    const f = funFacts[Math.floor(Math.random() * funFacts.length)]
    return `${f.label}: ${f.value}`
  }
  if (/contact|email|reach/.test(q)) {
    onNavigate?.('contact')
    return "Scrolling to the contact form — it'll parse what you type and route it straight to Kajal."
  }
  if (/hello|hi there|^hi$|hey/.test(q)) {
    return 'Hello! I can show you projects, skills, the journey timeline, or help you get in touch. What would you like to see?'
  }
  return "I'm a lightweight demo assistant, so my range is limited — try asking about Kajal, projects, skills, the journey, or how to get in touch."
}

export default function AICompanion({ onNavigate, accent }) {
  const [open, setOpen] = useState(false)
  const [mood, setMood] = useState('idle') // idle | talking | thinking
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Hello Kajal. Need help exploring the portfolio?' },
  ])
  const [input, setInput] = useState('')
  const orbRef = useRef(null)
  const scrollRef = useRef(null)

  useEffect(() => {
    const handler = () => setOpen(true)
    window.addEventListener('open-ai-companion', handler)
    return () => window.removeEventListener('open-ai-companion', handler)
  }, [])

  useEffect(() => {
    function onMove(e) {
      if (!orbRef.current) return
      const rect = orbRef.current.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = Math.max(-6, Math.min(6, (e.clientX - cx) / 40))
      const dy = Math.max(-6, Math.min(6, (e.clientY - cy) / 40))
      setPos({ x: dx, y: dy })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, open])

  function send(e) {
    e?.preventDefault()
    const text = input.trim()
    if (!text) return
    setMessages((m) => [...m, { role: 'user', text }])
    setInput('')
    setMood('thinking')
    setTimeout(() => {
      const reply = generateReply(text, onNavigate)
      setMessages((m) => [...m, { role: 'ai', text: reply }])
      setMood('talking')
      setTimeout(() => setMood('idle'), 900)
    }, 500)
  }

  return (
    <>
      {/* Floating orb */}
      <motion.button
        ref={orbRef}
        onClick={() => setOpen((o) => !o)}
        aria-label="Open AI assistant"
        className="fixed bottom-7 right-7 z-50 flex h-16 w-16 items-center justify-center rounded-full"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <motion.div
          style={{ x: pos.x, y: pos.y }}
          className="relative flex h-16 w-16 items-center justify-center rounded-full shadow-glow"
        >
          <div
            className="absolute inset-0 rounded-full opacity-70 blur-md"
            style={{ background: `radial-gradient(circle, ${accent}, transparent 70%)` }}
          />
          <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-cyan/40 bg-panel">
            <motion.div
              className="h-3 w-3 rounded-full bg-cyan"
              animate={
                mood === 'thinking'
                  ? { scale: [1, 0.6, 1] }
                  : mood === 'talking'
                  ? { scaleY: [1, 0.3, 1] }
                  : { scale: [1, 1.15, 1] }
              }
              transition={{ duration: mood === 'thinking' ? 0.5 : 1.4, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            className="fixed bottom-28 right-7 z-50 flex h-[440px] w-[min(360px,90vw)] flex-col overflow-hidden rounded-2xl glass shadow-glow"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div>
                <p className="font-display text-sm font-semibold">Kajal's AI Assistant</p>
                <p className="font-mono text-[10px] text-muted">
                  {mood === 'thinking' ? 'thinking…' : mood === 'talking' ? 'responding…' : 'online'}
                </p>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close assistant" className="text-muted hover:text-ink">
                <FiX />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${
                    m.role === 'ai'
                      ? 'bg-panel2/80 text-ink'
                      : 'ml-auto bg-gradient-to-r from-cyan to-violet text-void'
                  }`}
                >
                  {m.text}
                </div>
              ))}
            </div>

            <form onSubmit={send} className="flex items-center gap-2 border-t border-white/10 p-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Kajal, projects, skills..."
                aria-label="Message the AI assistant"
                className="flex-1 rounded-full border border-white/10 bg-panel px-4 py-2 text-sm text-ink placeholder:text-muted focus:outline-none focus:border-cyan/40"
              />
              <button
                type="submit"
                aria-label="Send message"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-cyan to-violet text-void"
              >
                <FiSend size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
