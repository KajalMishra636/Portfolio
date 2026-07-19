import { useEffect, useState } from 'react'

const KONAMI = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a',
]

export default function useEasterEggs() {
  const [message, setMessage] = useState(null)
  const [hologramMode, setHologramMode] = useState(false)

  useEffect(() => {
    let konamiBuffer = []
    let typedBuffer = ''

    function onKeyDown(e) {
      konamiBuffer = [...konamiBuffer, e.key].slice(-KONAMI.length)
      if (konamiBuffer.join(',') === KONAMI.join(',')) {
        setMessage('Konami code detected — congratulations, excellent choice.')
        setTimeout(() => setMessage(null), 3500)
      }

      if (e.key.length === 1) {
        typedBuffer = (typedBuffer + e.key).slice(-20)
      }
      if (typedBuffer.includes('sudo hire kajal')) {
        setMessage('Congratulations. Excellent choice.')
        setTimeout(() => setMessage(null), 3500)
        typedBuffer = ''
      }
      if (typedBuffer.includes('jarvis activate')) {
        setHologramMode((h) => !h)
        typedBuffer = ''
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return { message, hologramMode }
}
