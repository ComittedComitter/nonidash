import { useLocalStorage } from '@/lib/useLocalStorage'

export function useXp() {
  const xp = useLocalStorage('xp-bar:xp', 0)
  const level = useLocalStorage('xp-bar:level', 1)

  function addXp(amount: number) {
    xp.value += amount
    while (xp.value >= 100) {
      xp.value -= 100
      level.value++
    }
  }

  return { xp, level, addXp }
}
