import { describe, it, expect, vi } from 'vitest'

import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import App from '../App.vue'

const localStorageMock = {
  getItem: vi.fn(() => null),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
  get length() {
    return 0
  },
  key: vi.fn(),
}
globalThis.localStorage = localStorageMock as unknown as Storage

const pinia = createPinia()
setActivePinia(pinia)

describe('App', () => {
  it('mounts renders properly', () => {
    const wrapper = mount(App)
    expect(wrapper.text()).toContain('Dashboard')
  })
})
