import { ref, watch, type Ref } from 'vue'

const storageCache = new Map<string, Ref<unknown>>()

export function useLocalStorage<T>(key: string, defaultValue: T): Ref<T> {
  if (storageCache.has(key)) {
    return storageCache.get(key) as Ref<T>
  }

  const stored = localStorage.getItem(key)

  const state = ref<T>(stored ? JSON.parse(stored) : defaultValue) as Ref<T>

  watch(
    state,
    (value) => {
      localStorage.setItem(key, JSON.stringify(value))
    },
    { deep: true },
  )

  storageCache.set(key, state)
  return state
}
