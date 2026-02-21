import confetti from 'canvas-confetti'
import type { Options } from 'canvas-confetti'

export function useConfetti() {
  function fireConfetti(element?: HTMLElement | null) {
    if (!element) {
      confetti()
      return
    }

    const rect = element.getBoundingClientRect()
    const x = (rect.left + rect.width / 2) / window.innerWidth
    const y = (rect.top + rect.height) / window.innerHeight

    confetti({
      spread: 70,
      origin: { x, y },
    } as Options)
  }

  return { fireConfetti }
}
