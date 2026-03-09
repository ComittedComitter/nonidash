import confetti from 'canvas-confetti'
import type { Options } from 'canvas-confetti'
import { useLocalStorage } from '@vueuse/core'

export function useConfetti() {
  const userColor = useLocalStorage('user-color', '#e879f9')

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
      colors: [userColor.value, '#ffffff'],
    } as Options)
  }

  return { fireConfetti }
}
