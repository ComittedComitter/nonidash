Vue 3 (Composition API) + TypeScript
Vite
Pinia
Vue Router
TailwindCSS 4, tw-animate-css
reka-ui, @tabler/icons-vue, lucide-vue-next
swapy
@vueuse/core, class-variance-authority, clsx, tailwind-merge, zod
Vitest with jsdom
ESLint + Prettier

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
├── pages/                    # Page components (DashboardPage, RoadmapPage, etc.)
├── __tests__/               # Vitest tests (*.spec.ts)
├── App.vue                  # Root component with RouterView
├── main.ts                  # App entry point
├── style.css                # TailwindCSS + theme variables
└── types.ts                 # Core type definitions
```

---

## Verification Commands

- **Type check:** `npm run type-check`
- **Lint:** `npm run lint`
- **Dev server:** `npm run dev` (only run if explicitly asked - assume dev server is already running)

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
4. Add to `DashboardPage.vue`:
   - Import the component
   - Add it to `BOX_COMPONENTS` with a unique key (e.g., `journal: markRaw(JournalBox)`)

   This is required for the box to be saved and restored on page reload.
