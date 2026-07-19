export const themes = [
  { id: 'cyberpunk', name: 'Cyberpunk', accent: '#4ce0d2', accent2: '#8b7cf6', bg: '#05070c' },
  { id: 'matrix', name: 'Matrix', accent: '#3ef07a', accent2: '#1fae53', bg: '#040805' },
  { id: 'neon', name: 'Neon Purple', accent: '#c084fc', accent2: '#f472b6', bg: '#0a0512' },
  { id: 'hacker', name: 'Dark Hacker', accent: '#f5b942', accent2: '#e2542a', bg: '#070604' },
]

export const roles = [
  'Frontend Developer',
  'React Engineer',
  'Python AI Learner',
  'UI Engineer',
  'Creative Coder',
  'Full Stack Developer',
]

export const skills = [
  { name: 'React', category: 'Frontend', level: 92, note: 'Component architecture, hooks, performance tuning across 15+ shipped UIs.' },
  { name: 'JavaScript', category: 'Frontend', level: 90, note: 'ES2023+, async patterns, DOM & browser APIs.' },
  { name: 'TailwindCSS', category: 'Frontend', level: 88, note: 'Design-system driven utility styling at speed.' },
  { name: 'Framer Motion', category: 'Frontend', level: 80, note: 'Orchestrated page-load and scroll-triggered motion.' },
  { name: 'Python', category: 'AI / Backend', level: 78, note: 'Scripting, data handling, FastAPI services.' },
  { name: 'FastAPI', category: 'AI / Backend', level: 72, note: 'REST APIs, JWT auth, WebSocket endpoints.' },
  { name: 'LangChain', category: 'AI / Backend', level: 65, note: 'RAG pipelines and prompt orchestration, learning in depth.' },
  { name: 'Git & GitHub', category: 'Tooling', level: 90, note: 'Branching workflows, PR review, CI basics.' },
]

export const journey = [
  { year: '2022', title: 'Started Coding', detail: 'Wrote first lines of HTML & CSS, fell in love with building things for the browser.' },
  { year: '2022', title: 'HTML & CSS', detail: 'Learned semantic markup, layout systems, and responsive design fundamentals.' },
  { year: '2023', title: 'JavaScript', detail: 'Moved from static pages to interactive logic — DOM, events, async/await.' },
  { year: '2023', title: 'React', detail: 'Adopted component-driven development; built and shipped several React apps.' },
  { year: '2024', title: 'Backend Foundations', detail: 'Explored Node & Python backends, REST APIs, and databases.' },
  { year: '2024', title: 'Python & AI', detail: 'Started building with Python for AI-assisted tooling and automation.' },
  { year: '2025', title: 'Machine Learning', detail: 'Studying ML fundamentals — vectors, embeddings, and applied NLP.' },
  { year: 'Now', title: 'Future Goals', detail: 'Full-stack AI product engineering — shipping intelligent, human-centered software.' },
]

export const projects = [
  {
    id: 'p1',
    name: 'AI OS Portfolio',
    summary: 'This site — a React workspace with a floating AI companion, live theme engine, and simulated assistant.',
    stack: ['React', 'Tailwind', 'Framer Motion', 'Vite'],
    demo: '#',
    repo: '#',
    highlights: ['Boot-sequence load animation', 'Rule-based AI companion', 'Runtime theme engine'],
  },
  {
    id: 'p2',
    name: 'TaskFlow — Kanban App',
    summary: 'Drag-and-drop task board with realtime sync and keyboard-first interactions.',
    stack: ['React', 'Zustand', 'TailwindCSS'],
    demo: '#',
    repo: '#',
    highlights: ['Optimistic UI updates', 'Accessible drag & drop', 'Offline-first storage'],
  },
  {
    id: 'p3',
    name: 'PulseAPI — FastAPI Service',
    summary: 'A Python backend exposing auth, WebSockets, and a small RAG search endpoint over project docs.',
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'Docker'],
    demo: '#',
    repo: '#',
    highlights: ['JWT auth flow', 'WebSocket live updates', 'Dockerized deployment'],
  },
  {
    id: 'p4',
    name: 'Resume Radar',
    summary: 'Client-side resume vs. job-description matcher that highlights missing keywords.',
    stack: ['React', 'PDF.js', 'JavaScript'],
    demo: '#',
    repo: '#',
    highlights: ['In-browser PDF parsing', 'Keyword gap analysis', 'Zero backend required'],
  },
]

export const funFacts = [
  { label: 'Coffee → Code ratio', value: '3 cups : 1 feature' },
  { label: 'Favourite shortcut', value: 'Cmd + Shift + P' },
  { label: 'Currently exploring', value: 'RAG pipelines with ChromaDB' },
  { label: 'Dream stack', value: 'React + FastAPI + a very patient designer' },
]
