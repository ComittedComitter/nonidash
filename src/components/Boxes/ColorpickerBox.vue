<script setup lang="ts">
import { type PropType } from 'vue'
import { Item } from '@/components/ui/BareBox'
import EditableTitle from '../ui/EditableTitle.vue'
import { useLocalStorage } from '@vueuse/core'

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

const storageKey = `ColorpickerBox:${props.storageId}`
const colorData = useLocalStorage<{ color: string }>(storageKey, { color: '#3b82f6' })
const title = useLocalStorage<string>(`${props.storageId}:title`, 'Color Picker')

const colorOptions = [
  '#ef4444',
  '#f97316',
  '#f59e0b',
  '#eab308',
  '#84cc16',
  '#22c55e',
  '#10b981',
  '#14b8a6',
  '#06b6d4',
  '#0ea5e9',
  '#3b82f6',
  '#6366f1',
  '#8b5cf6',
  '#a855f7',
  '#d946ef',
  '#ec4899',
  '#f43f5e',
  '#78716c',
  '#64748b',
  '#1e293b',
]

function selectColor(color: string) {
  colorData.value = { color }
}
</script>

<template>
  <Item
    variant="outline"
    class="grid grid-rows-[auto_1fr]"
    @remove="props.onRemove?.(props.storageId)"
  >
    <EditableTitle v-model="title" :storage-key="`${storageId}:title`" />
    <div class="flex flex-col gap-2 p-4 overflow-y-auto">
      <div class="flex items-center gap-2">
        <input
          type="color"
          v-model="colorData.color"
          class="h-8 w-8 cursor-pointer rounded border-0"
        />
        <input
          type="text"
          v-model="colorData.color"
          class="flex-1 px-2 py-1 text-sm rounded-md border bg-background"
          placeholder="#000000"
        />
      </div>
      <div class="grid grid-cols-10 gap-1">
        <button
        data-swapy-
          v-for="color in colorOptions"
          :key="color"
          @click="selectColor(color)"
          :class="[
            'aspect-square rounded-lg border-2 transition-transform hover:scale-110',
            colorData.color === color ? 'border-foreground' : 'border-transparent',
          ]"
          :style="{ backgroundColor: color }"
        />
      </div>
    </div>
  </Item>
</template>
