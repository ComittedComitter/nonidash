# Nonidash

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
│   │   └── *.vue
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

## Code Style

### Imports

Order imports consistently:

1. Vue/framework imports (`vue`, `vue-router`, `pinia`)
2. External libraries (`lucide-vue-next`, `reka-ui`, etc.)
3. Internal components (`@/components/...`)
4. Internal lib/utils (`@/lib/...`, `@/stores/...`)
5. Types (`@/types`)

### State Management (Pinia)

Use Composition API stores with `defineStore()` and function setup. Name stores with `use*Store` pattern.

### LocalStorage Pattern

Use the `useLocalStorage` composable for reactive localStorage:

```typescript
import { useLocalStorage } from '@/lib/useLocalStorage'
import type { Task } from '@/types'

const storageKey = `TodoBox:${props.storageId}`
const tasks = useLocalStorage<Task[]>(storageKey, [])
```

---

## Scaffolding New Boxes

To create a new box component:

1. Create `src/components/Boxes/YourBoxName.vue`
2. Import required components and use localStorage:

   ```typescript
   import { Item, ItemContent } from '@/components/ui/BareBox'
   import EditableTitle from '../ui/EditableTitle.vue'
   import { useLocalStorage } from '@/lib/useLocalStorage'

   const props = defineProps({
     storageId: {
       type: String,
       required: true,
     },
   })

   const storageKey = `YourBoxName:${props.storageId}`
   const data = useLocalStorage<YourType>(storageKey, defaultValue)
   ```

3. Add to `AddBox.vue`:
   - Import the component
   - Add a `DropdownMenuItem` with `markRaw(YourComponent)`
4. Add to `App.vue`:
   - Import the component
   - Add it to `BOX_COMPONENTS` with a unique key (e.g., `journal: markRaw(JournalBox)`)

   This is required for the box to be saved and restored on page reload.
