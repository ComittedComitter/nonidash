<script setup lang="ts">
import { computed, ref, type PropType } from 'vue'
import { Item } from '@/components/ui/BareBox'
import EditableTitle from '../ui/EditableTitle.vue'
import { useLocalStorage } from '@/lib/useLocalStorage'

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

const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

function getOrderedDays(currentDay: number): number[] {
  const days: number[] = []
  for (let i = 1; i <= 7; i++) {
    const day = ((currentDay + i - 1) % 7) + 1
    days.push(day)
  }
  return days
}

const today = new Date()
const currentDayIndex = today.getDay()
const orderedDays = getOrderedDays(currentDayIndex)

const selectedDay = ref(orderedDays[6]!)

function formatDateForDay(day: number): string {
  const date = new Date(today)
  const diff = day - currentDayIndex
  date.setDate(date.getDate() + diff)
  return date.toISOString().split('T')[0] as string
}

const storageKey = `JournalBox:${props.storageId}`
const entries = useLocalStorage<Record<string, string>>(storageKey, {})

const currentDate = computed(() => formatDateForDay(selectedDay.value))
const currentEntry = computed({
  get: () => entries.value[currentDate.value] ?? '',
  set: (val) => {
    entries.value[currentDate.value] = val
  },
})
</script>

<template>
  <Item
    variant="outline"
    class="grid grid-rows-[auto_1fr]"
    @remove="props.onRemove?.(props.storageId)"
  >
    <EditableTitle model-value="Journal" />
    <div class="flex flex-col h-full">
      <div class="flex gap-1 justify-center py-2 overflow-x-auto" data-swapy-no-drag>
        <button
          v-for="day in orderedDays"
          :key="day"
          @click="selectedDay = day"
          :class="[
            'px-2 py-1 text-xs rounded transition-colors',
            selectedDay === day ? 'bg-primary text-primary-foreground' : 'hover:bg-muted',
          ]"
        >
          {{ DAY_LABELS[(day as number) - 1] }}
        </button>
      </div>
      <textarea
        v-model="currentEntry"
        class="flex-1 w-full resize-none bg-transparent border-none focus:outline-none focus:ring-0 p-2 text-sm"
        placeholder="Write your journal entry..."
      />
    </div>
  </Item>
</template>
