import { useState } from 'react'
import { FiSearch, FiMenu, FiX } from 'react-icons/fi'

const LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'journey', label: 'Journey' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

const SEARCH_INDEX = LINKS.map((l) => l.id)

export default function Navbar({ onNavigate }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')

  function go(id) {
    setOpen(false)
    onNavigate(id)
  }

  function handleSearch(e) {
    e.preventDefault()
    const q = query.toLowerCase().trim()
    const match = SEARCH_INDEX.find((id) => id.includes(q)) || (q.includes('resume') ? 'contact' : null)
    if (match) go(match)
    setQuery('')
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto mt-4 flex w-[min(1100px,94vw)] items-center justify-between rounded-2xl glass px-4 py-3">
        <button onClick={() => go('home')} className="font-display text-lg font-semibold tracking-wide">
          KAJAL<span className="text-gradient">.OS</span>
        </button>

        <nav className="hidden items-center gap-6 md:flex">
          {LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className="font-mono text-xs uppercase tracking-widest text-muted transition hover:text-cyan"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <form onSubmit={handleSearch} className="hidden items-center gap-2 rounded-full border border-cyan/20 bg-panel/60 px-3 py-1.5 md:flex">
            <FiSearch className="text-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search portfolio..."
              aria-label="Search portfolio"
              className="w-36 bg-transparent font-mono text-xs text-ink placeholder:text-muted focus:outline-none"
            />
          </form>
          <button className="md:hidden" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
            {open ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="mx-auto mt-2 w-[min(1100px,94vw)] rounded-2xl glass p-4 md:hidden">
          <div className="flex flex-col gap-3">
            {LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className="text-left font-mono text-xs uppercase tracking-widest text-muted hover:text-cyan"
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
