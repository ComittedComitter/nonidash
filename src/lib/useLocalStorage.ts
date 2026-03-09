import { useLocalStorage as useVueUseLocalStorage } from '@vueuse/core'

export function useLocalStorage<T>(key: string, defaultValue: T) {
  return useVueUseLocalStorage<T>(key, defaultValue)
}
