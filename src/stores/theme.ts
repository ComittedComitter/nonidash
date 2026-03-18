import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(false)

  function init() {
    const saved = localStorage.getItem('theme')
    if (saved) {
      isDark.value = saved === 'dark'
    } else {
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    applyTheme()
  }

  function applyTheme() {
    if (isDark.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  function setTheme(nextValue: boolean) {
    isDark.value = nextValue
    localStorage.setItem('theme', nextValue ? 'dark' : 'light')
    applyTheme()
  }

  function toggle() {
    setTheme(!isDark.value)
  }

  watch(isDark, applyTheme)

  return { isDark, init, toggle, setTheme }
})
