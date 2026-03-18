<script setup lang="ts">
import { computed, ref, type PropType } from 'vue'
import { Item } from '@/components/ui/BareBox'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Textarea from '../ui/textarea/Textarea.vue'
import EditableTitle from '../ui/EditableTitle.vue'
import { useLocalStorage } from '@vueuse/core'
import journalPrompts from '@/assets/journalPrompts.json'
import { ChevronDownIcon } from 'lucide-vue-next'

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

const placeholder = computed(() => journalPrompts[selectedDay.value - 1] ?? journalPrompts[0]!)
const selectedDayLabel = computed(() => DAY_LABELS[selectedDay.value - 1] ?? DAY_LABELS[0])
</script>

<template>
  <Item
    variant="outline"
    class="grid grid-rows-[auto_1fr]"
    @remove="props.onRemove?.(props.storageId)"
  >
    <div class="flex justify-between">
      <EditableTitle model-value="Journal" :storage-key="`${storageId}:title`" />

      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="outline" size="sm" class="gap-2 lg:hidden" data-swapy-no-drag>
            {{ selectedDayLabel }}
            <ChevronDownIcon class="size-4 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" class="w-36 lg:hidden" data-swapy-no-drag>
          <DropdownMenuRadioGroup v-model="selectedDay">
            <DropdownMenuRadioItem v-for="day in orderedDays" :key="day" :value="day">
              {{ DAY_LABELS[day - 1] }}
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <div class="hidden gap-1 justify-center overflow-x-auto py-2 lg:flex" data-swapy-no-drag>
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
    </div>
    <div class="flex flex-col h-full">
      <Textarea
        v-model="currentEntry"
        data-swapy-no-drag
        class="flex-1 resize-none"
        :placeholder="placeholder"
      />
    </div>
  </Item>
</template>
