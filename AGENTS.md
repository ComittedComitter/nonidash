# Nonidash (habits)

A dashboard application for tracking habits, timers, todos with draggable boxes.

## Tech Stack

- **Framework**: Vue 3 (Composition API) + TypeScript
- **Build**: Vite
- **State**: Pinia
- **Routing**: Vue Router
- **Styling**: TailwindCSS 4, tw-animate-css
- **UI**: reka-ui, @tabler/icons-vue, lucide-vue-next
- **Drag & Drop**: swapy
- **Utilities**: @vueuse/core, class-variance-authority, clsx, tailwind-merge, zod
- **Testing**: Vitest with jsdom
- **Linting**: ESLint + Prettier

---

## Project Structure

```
src/
├── components/
│   ├── Boxes/            # Dashboard widgets (HabitBox, TimerBox, TodoBox, etc.) Put new boxes here
│   │   └── *.vue
│   ├── ui/               # Reusable shadcn-style components
│   │   ├── *.vue
│   ├── AppSidebar.vue
│   ├── NavMain.vue
│   ├── NavProjects.vue
│   ├── NavUser.vue
│   └── TeamSwitcher.vue
├── lib/
│   ├── useLocalStorage.ts    # Wrapper for localStorage with reactivity
│   └── utils.ts              # Utilities (cn helper, etc.)
├── stores/                   # Pinia stores (theme.ts, counter.ts)
├── router/                   # Vue Router config
├── __tests__/               # Vitest tests (*.spec.ts)
├── App.vue                  # Main dashboard with swapy
├── main.ts                  # App entry point
├── style.css                # TailwindCSS + theme variables
└── types.ts                 # Core type definitions
```

---

## Code Style Guidelines

### General Rules

- Use **Composition API** (`<script setup>`) for all Vue components
- Use **TypeScript** for all files - avoid `any`
- Prefer **single quotes** for strings 
- **No semicolons** 
- **Print width**: 100 characters

### Imports

Order imports consistently:

1. Vue/framework imports (`vue`, `vue-router`, `pinia`)
2. External libraries (`lucide-vue-next`, `reka-ui`, etc.)
3. Internal components (`@/components/...`)
4. Internal lib/utils (`@/lib/...`, `@/stores/...`)
5. Types (`@/types`)

```typescript
// Correct
import { ref, computed } from 'vue'
import { Trash2Icon } from 'lucide-vue-next'
import { Item, ItemContent } from '@/components/ui/BareBox'
import Button from '../ui/button/Button.vue'
import type { Task } from '@/types'
import { useLocalStorage } from '@/lib/useLocalStorage'
```

### Vue Components

- Use `<script setup lang="ts">` for all components
- Define props with `defineProps()` - prefer object syntax for better typing
- Use `defineEmits()` for events
- Use `markRaw()` for non-reactive component references (e.g., passing Vue components to dynamic rendering)

```typescript
// Props example
const props = defineProps({
  storageId: {
    type: String,
    required: true,
  },
})

// Emits example
const emit = defineEmits<{
  add: [component: ReturnType<typeof markRaw>, boxId: string]
}>()
```

### State Management (Pinia)

- Use Composition API stores with `defineStore()` and function setup
- Name stores with `use*Store` pattern (e.g., `useThemeStore`, `useCounterStore`)

### Types

- Define shared types in `src/types.ts`
- Use interfaces for objects, types for unions/primitives
- Avoid `any` - use `unknown` when type is truly unknown

```typescript
// Good
interface Task {
  id: string
  title: string
  done: boolean
}

// Avoid
type Task = { id: string; title: string; done: boolean } // use interface instead
```

### Naming Conventions

- **Components**: PascalCase (e.g., `HabitBox.vue`, `TodoBox.vue`)
- **Files**: kebab-case (e.g., `use-local-storage.ts`)
- **Variables/functions**: camelCase
- **Constants**: SCREAMING_SNAKE_CASE (only for true constants)
- **CSS classes**: kebab-case (Tailwind convention)

### Error Handling

- Use try/catch for async operations with meaningful error messages
- Log errors to console with context
- Handle localStorage parse errors gracefully (see App.vue for example)

```typescript
try {
  const parsed = JSON.parse(savedLayout)
} catch (e) {
  console.error('Failed to parse saved layout', e)
  localStorage.removeItem('dashboardLayout')
}
```

### TailwindCSS

- Use Tailwind utility classes directly in templates
- Use `@apply` sparingly - only for reusable patterns in `<style>`
- Theme variables are defined in `style.css` (`:root` and `.dark`)
- Use `cn()` utility from `@/lib/utils` for conditional class merging

---

## Testing

Tests live in `src/__tests__/` and use `@vue/test-utils` with jsdom.

```typescript
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '../App.vue'

describe('App', () => {
  it('mounts renders properly', () => {
    const wrapper = mount(App)
    expect(wrapper.text()).toContain('Dashboard')
  })
})
```

---

## LocalStorage Pattern

Use the `useLocalStorage` composable for reactive localStorage:

```typescript
import { useLocalStorage } from '@/lib/useLocalStorage'
import type { Task } from '@/types'

const storageKey = `TodoBox:${props.storageId}`
const tasks = useLocalStorage<Task[]>(storageKey, [])
```

This provides automatic reactivity and JSON serialization.

---

## Scaffolding New Boxes

To create a new box component:

1. Create `src/components/Boxes/YourBoxName.vue`
2. Import required components:
   ```typescript
   import { Item, ItemContent } from '@/components/ui/BareBox'
   import EditableTitle from '../ui/EditableTitle.vue'
   import { useLocalStorage } from '@/lib/useLocalStorage'
   ```
3. Define props with `storageId`:
   ```typescript
   const props = defineProps({
     storageId: {
       type: String,
       required: true,
     },
   })
   ```
4. Use localStorage pattern:
   ```typescript
   const storageKey = `YourBoxName:${props.storageId}`
   const data = useLocalStorage<YourType>(storageKey, defaultValue)
   ```
5. Add to `AddBox.vue`:
   - Import the component
   - Add a `DropdownMenuItem` with `markRaw(YourComponent)`
