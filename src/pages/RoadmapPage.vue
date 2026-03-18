<script setup lang="ts">
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'

import RoadMapBox from '@/components/Boxes/RoadMapBox.vue'

const V0RoadmapData = [
  {
    version: 'V0.1',
    subtitle: 'Foundations',
    items: [
      { label: 'Habit tracker', done: true },
      { label: 'Timer', done: true },
      { label: 'Todo List', done: true },
      { label: 'Date and Clock', done: true },
    ],
  },
  {
    version: 'V0.2',
    subtitle: 'Interaction',
    items: [
      { label: 'Progress Bar', done: true },
      { label: 'Move boxes', done: true },
      { label: "'Add box' button", done: true },
      { label: 'Anti-drag zones', done: true },
    ],
  },
  {
    version: 'V0.3',
    subtitle: 'Todo',
    items: [
      { label: 'Local Storage', done: true },
      { label: 'Type in UI', done: true },
      { label: 'Individual storage', done: true },
      { label: 'Delete Tasks', done: true },
    ],
  },
  {
    version: 'V0.4',
    subtitle: 'Habits',
    items: [
      { label: 'Local Storage', done: true },
      { label: 'Set target', done: true },
      { label: 'Change Title', done: true },
      { label: 'Confetti', done: true },
    ],
  },
  {
    version: 'V0.5',
    subtitle: 'Timer',
    items: [
      { label: 'Local Storage', done: true },
      { label: 'Set duration', done: true },
      { label: 'Notification', done: true },
      { label: 'Confirm and Total', done: true },
    ],
  },
  {
    version: 'V0.6',
    subtitle: 'Journal',
    items: [
      { label: 'Local Storage', done: true },
      { label: 'Text entry', done: true },
      { label: 'Daily note UI', done: true },
      { label: 'Daily prompt', done: true },
    ],
  },
  {
    version: 'V0.7',
    subtitle: 'XP system',
    items: [
      { label: 'XP bar in sidebar', done: true },
      { label: 'Habit xp once', done: true },
      { label: 'Level Display', done: true },
      { label: 'Levelup Animation', done: false },
    ],
  },
  {
    version: 'V0.8',
    subtitle: 'Color',
    items: [
      { label: 'Color Picker', done: true },
      { label: 'Color in UI', done: true },
      { label: 'XP Bar color', done: true },
      { label: 'Avatar Picker', done: false },
    ],
  },
  {
    version: 'V0.9',
    subtitle: 'Hello World',
    items: [
      { label: 'Polish', done: true },
      { label: 'Domain', done: true },
      { label: 'Build', done: true },
      { label: 'Host', done: true },
    ],
  },
  {
    version: 'V1.0',
    subtitle: 'Finish',
    items: [
      { label: 'Ask for feedback', done: true },
      { label: 'Bug fix', done: true },
      { label: 'Fixed localStorage', done: true },
      { label: 'Roadmap Page', done: true },
    ],
  },
]
const V1RoadmapData = [
  {
    version: 'V1.1',
    subtitle: 'UI',
    items: [
      { label: 'Fix Todo overflow', done: true },
      { label: 'Fix Journal inputbox', done: true },
      { label: 'Sidebar closed by default', done: true },
      { label: 'Sidebar persistent state', done: true },
    ],
  },
    {
    version: 'V1.2',
    subtitle: 'Database',
    items: [
      { label: 'Learn Convex', done: true },
      { label: 'Set up Convex', done: false },
      { label: 'Store user data', done: false },
      { label: 'Authentication', done: false },
    ],
  },

  {
    version: 'V1.3',
    subtitle: 'Design',
    items: [
      { label: 'Figma - Teenage engineering', done: false },
      { label: 'Figma - Hobonichi', done: false },
      { label: 'Figma - Experiment', done: false },
      { label: 'Implement', done: false },
    ],
  },
  {
    version: 'V1.4',
    subtitle: 'Fun',
    items: [
      { label: 'Gsap animation', done: false },
      { label: 'Shader', done: false },
      { label: 'Plantenrekje', done: false },
      { label: '??', done: false },
    ],
  },
  {
    version: 'V1.5',
    subtitle: 'Coolers',
    items: [
      { label: 'Color picker UI', done: false },
      { label: 'Change modes', done: false },
      { label: 'Color picker API', done: false },
      { label: '??', done: false },
    ],
  },
  {
    version: 'V1.6',
    subtitle: 'Todo',
    items: [
      { label: 'Optionally add dates', done: false },
      { label: 'Settings: sort & remove checked', done: true },
      { label: 'Remove subtitle', done: true },
      { label: 'Convex', done: false },
    ],
  },
  {
    version: 'V1.7',
    subtitle: 'Timer',
    items: [
      { label: 'History view', done: false },
      { label: 'Multiple timers in the box', done: false },
      { label: 'Interval timer', done: false },
      { label: 'Convex', done: false },
    ],
  },
  {
    version: 'V1.8',
    subtitle: 'Journal',
    items: [
      { label: 'History view', done: false },
      { label: 'Markdown', done: false },
      { label: '??', done: false },
      { label: 'Convex', done: false },
    ],
  },
  {
    version: 'V1.9',
    subtitle: 'Habits',
    items: [
      { label: 'History view', done: true },
      { label: 'Reposition title', done: true },
      { label: 'Change to monthly view', done: true },
      { label: 'Convex', done: false },
    ],
  },
  {
    version: 'V2.0',
    subtitle: 'Ship 🚀',
    items: [
      { label: 'Ask for feedback', done: false },
      { label: 'Bugfix', done: false },
      { label: '??', done: false },
      { label: '??', done: false },
    ],
  },
]
</script>

<template>
  <header
    class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12"
  >
    <div class="flex items-center gap-2 px-4">
      <SidebarTrigger class="-ml-1" />
      <Separator orientation="vertical" class="mr-2 data-[orientation=vertical]:h-4" />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem class="hidden md:block">
            <BreadcrumbLink href="/"> Dashboard </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="/roadmap"> Roadmap </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  </header>
  <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
    <RoadMapBox :data="V0RoadmapData" title="V0 InDev" />
    <RoadMapBox :data="V1RoadmapData" title="V1 Alpha" />
  </div>
</template>
