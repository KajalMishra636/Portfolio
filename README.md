# Kajal Mishra — AI OS Portfolio

A React + Vite + Tailwind + Framer Motion portfolio built around an "AI operating system"
concept: a boot sequence on load, a floating AI companion, a rule-based assistant, a skill
galaxy, an interactive journey timeline, a project showcase, a natural-language contact form,
a runtime theme engine, and a couple of hidden easter eggs.

## Run it

```bash
npm install
npm run dev
```

Then open the printed local URL (typically http://localhost:5173).

Build for production:

```bash
npm run build
npm run preview
```

## What's real vs. simulated

The original brief asked for a full AI backend (FastAPI, LangChain, OpenAI/GPT, RAG,
ChromaDB/FAISS, speech recognition, a Postgres/Redis database, an admin analytics dashboard,
etc). That's a legitimate full-stack product, not something that can run inside a static
front-end bundle — it needs a server, a database, and API keys.

This project ships a **fully working front end** with every interaction wired up, but two
pieces are intentionally simulated client-side so the site works with zero setup:

- **AI companion / chatbot** (`src/components/AICompanion.jsx`) — uses simple keyword/intent
  matching (`generateReply`) instead of a live LLM call. It still navigates the page, answers
  common questions, and feels responsive.
- **Smart contact form** (`src/components/Contact.jsx`) — uses regex to pull an email, budget,
  timeline, and company out of free text (`parseMessage`) instead of a real NLP extraction
  pipeline.

### Wiring up a real backend later

Both of the above are isolated in single functions, so swapping in a real API is a small
change:

1. Stand up a FastAPI service exposing e.g. `POST /api/chat` and `POST /api/contact`.
2. In `AICompanion.jsx`, replace the `generateReply(...)` call with a `fetch('/api/chat', ...)`
   call and stream/await the response.
3. In `Contact.jsx`, replace `parseMessage(...)` with a `fetch('/api/contact', ...)` call that
   returns structured JSON from an LLM.
4. Add your OpenAI/Groq/Gemini key server-side only — never in the front end.

## Project structure

```
index.html
src/
  main.jsx              entry point
  App.jsx                theme state, boot sequence, layout
  index.css              Tailwind + global styles
  useEasterEggs.js       Konami code + typed terminal commands
  data/portfolioData.js  all copy: skills, projects, timeline, themes
  components/
    BootScreen.jsx        "Initializing Kajal AI OS..." load sequence
    ParticleField.jsx      canvas particle/neural-line background
    Navbar.jsx              nav + portfolio search
    Hero.jsx                headline, typing animation, CTAs
    About.jsx               about cards + fun facts
    SkillGalaxy.jsx         clickable skill nodes with detail modal
    Timeline.jsx            expandable journey timeline
    Projects.jsx            filterable project showcase
    Contact.jsx             natural-language contact form
    AICompanion.jsx         floating orb + chat panel
    ThemeSwitcher.jsx       runtime theme picker
```

## Customizing content

Everything text-based (skills, projects, timeline entries, fun facts, themes, role list in the
hero typewriter) lives in `src/data/portfolioData.js` — edit that file first.

Replace `public/resume.pdf` with your actual résumé (same filename, or update the link in
`Contact.jsx`).

## Easter eggs

- **Konami code**: ↑ ↑ ↓ ↓ ← → ← → b a
- Type **`sudo hire kajal`** anywhere on the page
- Type **`jarvis activate`** anywhere on the page to toggle a hue-shifted "hologram mode"

## Notes on scope

- 3D holograms/Three.js scenes and GSAP were intentionally scoped down to a lightweight canvas
  particle field + Framer Motion, to keep the bundle small and the animation smooth on mobile.
  If you want a true Three.js hero (e.g. a rotating 3D avatar or skill orbit), it can be added
  in `Hero.jsx` — `@react-three/fiber` is a drop-in addition.
- Theme switching currently re-colors the cursor glow, the AI orb, and swatches; extending it
  to every Tailwind utility across the site would mean moving the palette to CSS variables
  consumed by Tailwind's config (`theme.extend.colors` referencing `var(--accent)`), which is a
  clean follow-up if you want full-site re-skinning.
