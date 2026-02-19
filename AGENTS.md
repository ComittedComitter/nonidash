# Nonidash (habits)

A Vue 3 + Vite dashboard application for tracking habits, timers, todos, dates, and roadmaps with draggable boxes.

## Tech Stack

- **Framework**: Vue 3 (Composition API) + TypeScript
- **Build**: Vite
- **State**: Pinia
- **Routing**: Vue Router
- **Styling**: TailwindCSS 4, tw-animate-css
- **UI**: reka-ui, @tabler/icons-vue, lucide-vue-next
- **Drag & Drop**: swapy
- **Utilities**: @vueuse/core, class-variance-authority, clsx, tailwind-merge, zod
- **Testing**: Vitest
- **Linting**: ESLint + Prettier

## Project Structure

```
nonidash/
├── src/
│   ├── components/
│   │   ├── HabitBoxes/       # Main dashboard widgets
│   │   │   ├── AddBox.vue
│   │   │   ├── DateBox.vue
│   │   │   ├── HabitBox.vue
│   │   │   ├── RoadMap.vue
│   │   │   ├── TimerBox.vue
│   │   │   └── TodoBox.vue
│   │   ├── ui/               # Reusable UI components (shadcn-style)
│   │   │   ├── avatar/
│   │   │   ├── barebox/
│   │   │   ├── breadcrumb/
│   │   │   ├── checkbox/
│   │   │   ├── collapsible/
│   │   │   ├── skeleton/
│   │   │   ├── sidebar/
│   │   │   ├── tooltip/
│   │   │   ├── EditableTimer.vue
│   │   │   └── EditableTitle.vue
│   │   ├── AppSidebar.vue
│   │   ├── NavMain.vue
│   │   ├── NavProjects.vue
│   │   ├── NavUser.vue
│   │   └── TeamSwitcher.vue
│   ├── lib/                  # Utilities
│   │   ├── useLocalStorage.ts
│   │   └── utils.ts
│   ├── router/
│   ├── stores/               # Pinia stores
│   ├── App.vue               # Main dashboard with draggable boxes
│   ├── main.ts
│   └── style.css
├── components.json           # shadcn component config
├── vite.config.ts
└── package.json
```

## Commands

```bash
npm run dev         # Start dev server
npm run build       # Build for production
npm run preview     # Preview production build
npm run test:unit   # Run Vitest tests
npm run lint        # Lint and fix
npm run type-check # TypeScript check
npm run format      # Format with Prettier
```

## Key Features

- **Draggable Dashboard**: Uses swapy for drag-and-drop box arrangement
- **Persistent Layout**: Dashboard layout saved to localStorage
- **Box Types**: HabitBox, TimerBox, TodoBox, DateBox, RoadMap, AddBox
- **Timer**: Countdown timer with audio feedback
- **Todo**: Task list with checkboxes
- **Roadmap**: Visual progress tracker

## Type Definitions

Core types in `src/types.ts`:
- `Task`: id, title, done
- `TimerState`: endTime, remaining, running
