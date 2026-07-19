/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void: '#05070c',
        panel: '#0b1220',
        panel2: '#0f1830',
        cyan: {
          DEFAULT: '#4ce0d2',
          soft: '#7ff0e4',
        },
        violet: {
          DEFAULT: '#8b7cf6',
          soft: '#b4a9ff',
        },
        amber: '#f5b942',
        ink: '#eaf1f7',
        muted: '#7688a3',
      },
      fontFamily: {
        display: ['"Chakra Petch"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 40px rgba(76,224,210,0.25)',
        violetglow: '0 0 40px rgba(139,124,246,0.25)',
      },
      backgroundImage: {
        grid: 'linear-gradient(rgba(76,224,210,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(76,224,210,0.06) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
}
