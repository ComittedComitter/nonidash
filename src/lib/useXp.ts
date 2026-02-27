import { useLocalStorage } from '@/lib/useLocalStorage'
import { ref } from 'vue'

const isTransitioning = ref(false)

export function useXp() {
  const xp = useLocalStorage('xp-bar:xp', 0)
  const level = useLocalStorage('xp-bar:level', 1)

  function addXp(amount: number) {
    xp.value += amount
    isTransitioning.value = true
    setTimeout(() => {
      isTransitioning.value = false
    }, 1000)
    while (xp.value >= 100) {
      xp.value -= 100
      level.value++
    }
  }

  return { xp, level, addXp, isTransitioning }
}
