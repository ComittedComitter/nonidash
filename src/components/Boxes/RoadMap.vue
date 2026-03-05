<script setup lang="ts">
import { Item, ItemContent } from '@/components/ui/BareBox'
import { Checkbox } from '@/components/ui/checkbox'
import type { PropType } from 'vue'

const props = defineProps({
  storageId: {
    type: String,
    required: true,
  },
  onRemove: {
    type: Function as PropType<(boxId: string) => void>,
    required: false,
  },
})

const roadmapData = [
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
      { label: 'Bug fix', done: false },
      { label: '???', done: false },
      { label: 'Profit', done: false },
    ],
  },
  {
    version: 'V1.1',
    subtitle: 'UI',
    items: [
      { label: 'Fix Todo overflow', done: true },
      { label: 'Fix Journal inputbox', done: false },
      { label: 'Sidebar closed by default', done: false },
      { label: 'Profit', done: false },
    ],
  },
]
</script>

<template>
  <Item
    variant="outline"
    class="items-start p-10 content-start"
    @remove="props.onRemove?.(props.storageId)"
  >
    <h2 class="text-3xl font-bold w-xl">Noni Roadmap</h2>
    <div class="grid grid-cols-10 gap-1">
      <div v-for="col in roadmapData" :key="col.version">
        <div class="text-lg font-bold">
          {{ col.version }}
          <span class="font-normal text-sm text-gray-400">{{ col.subtitle }}</span>
        </div>
        <div v-for="item in col.items" :key="item.label" class="flex gap-3 items-center">
          <Checkbox :default-value="item.done" /><ItemContent>{{ item.label }}</ItemContent>
        </div>
      </div>
    </div>
  </Item>
</template>
