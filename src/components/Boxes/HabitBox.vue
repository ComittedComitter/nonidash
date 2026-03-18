<script setup lang="ts">
import { computed, ref, watch, type PropType } from 'vue'
import { Item } from '@/components/ui/BareBox'
import { Button } from '@/components/ui/button'
import CheckCircle from '@/components/ui/checkbox/CheckCircle.vue'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Progress } from '@/components/ui/progress'
import { ChevronDownIcon, MinusIcon, PlusIcon } from 'lucide-vue-next'
import EditableTitle from '../ui/EditableTitle.vue'
import { useLocalStorage } from '@vueuse/core'
import { useConfetti } from '@/lib/useConfetti'
import { useXp } from '@/lib/useXp'

type MonthEntries = Record<string, number[]>
type CheckboxState = boolean | 'indeterminate'

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

const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const monthFormatter = new Intl.DateTimeFormat(undefined, { month: 'long' })
const monthWithYearFormatter = new Intl.DateTimeFormat(undefined, {
  month: 'long',
  year: 'numeric',
})

const { fireConfetti } = useConfetti()
const { addXp } = useXp()
const itemRef = ref<HTMLElement | null>(null)

function formatMonthKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
}

function parseMonthKey(value: string): Date {
  const parts = value.split('-')
  const parsedYear = Number(parts[0])
  const parsedMonth = Number(parts[1])
  const year = Number.isFinite(parsedYear) ? parsedYear : today.getFullYear()
  const month = Number.isFinite(parsedMonth) ? parsedMonth : today.getMonth() + 1
  return new Date(year, month - 1, 1)
}

const today = new Date()
const currentMonthKey = formatMonthKey(today)

const selectedMonthKey = useLocalStorage(`habitbox:${props.storageId}:month`, currentMonthKey)
const completedByMonth = useLocalStorage<MonthEntries>(`habitbox:${props.storageId}:months`, {})
const rewardedWeeks = useLocalStorage<string[]>(`habitbox:${props.storageId}:rewarded-weeks`, [])
const target = useLocalStorage(`habitbox:${props.storageId}:target`, 5)

const selectedMonth = computed(() => parseMonthKey(selectedMonthKey.value))
const monthOptions = computed(() => {
  const year = selectedMonth.value.getFullYear()

  return Array.from({ length: 12 }, (_, monthIndex) => {
    const date = new Date(year, monthIndex, 1)

    return {
      key: formatMonthKey(date),
      label: monthFormatter.format(date),
    }
  })
})

const daysInMonth = computed(() => {
  const date = selectedMonth.value
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
})

const leadingEmptyDays = computed(() => (selectedMonth.value.getDay() + 6) % 7)
const selectedDays = computed(() => completedByMonth.value[selectedMonthKey.value] ?? [])
const selectedMonthLabel = computed(() => monthWithYearFormatter.format(selectedMonth.value))

function startOfWeek(date: Date): Date {
  const start = new Date(date)
  const offset = (start.getDay() + 6) % 7
  start.setDate(start.getDate() - offset)
  start.setHours(0, 0, 0, 0)
  return start
}

function addDays(date: Date, amount: number): Date {
  const next = new Date(date)
  next.setDate(next.getDate() + amount)
  return next
}

function formatDateKey(date: Date): string {
  return `${formatMonthKey(date)}-${String(date.getDate()).padStart(2, '0')}`
}

function isDateChecked(date: Date): boolean {
  const monthEntries = completedByMonth.value[formatMonthKey(date)] ?? []
  return monthEntries.includes(date.getDate())
}

const currentWeekStart = computed(() => startOfWeek(today))
const currentWeekKey = computed(() => formatDateKey(currentWeekStart.value))
const currentWeekDates = computed(() =>
  Array.from({ length: 7 }, (_, index) => addDays(currentWeekStart.value, index)),
)
const currentWeekDateKeys = computed(() => new Set(currentWeekDates.value.map((date) => formatDateKey(date))))
const currentWeekCompletedCount = computed(
  () => currentWeekDates.value.filter((date) => isDateChecked(date)).length,
)
const weeklyTargetReached = computed(() => currentWeekCompletedCount.value >= target.value)
const progressValue = computed(() => Math.min((currentWeekCompletedCount.value / target.value) * 100, 100))

const calendarDays = computed(() => {
  const date = selectedMonth.value
  const year = date.getFullYear()
  const month = date.getMonth()

  return Array.from({ length: daysInMonth.value }, (_, index) => {
    const day = index + 1
    const dayDate = new Date(year, month, day)
    return {
      day,
      checked: selectedDays.value.includes(day),
      isCurrentWeek: currentWeekDateKeys.value.has(formatDateKey(dayDate)),
      isToday:
        today.getFullYear() === year && today.getMonth() === month && today.getDate() === day,
    }
  })
})

function updateSelectedDays(nextDays: number[]) {
  completedByMonth.value = {
    ...completedByMonth.value,
    [selectedMonthKey.value]: nextDays,
  }
}

function increaseTarget() {
  if (target.value >= 7) return
  target.value++
}

function decreaseTarget() {
  if (target.value <= 1) return
  target.value--
}

function toggleDay(day: number, state: CheckboxState) {
  const nextDays = new Set(selectedDays.value)

  if (state === true) {
    nextDays.add(day)
  } else {
    nextDays.delete(day)
  }

  updateSelectedDays(Array.from(nextDays).sort((left, right) => left - right))
}

watch(
  [currentWeekKey, weeklyTargetReached],
  ([weekKey, reached], previousValue) => {
    const [previousWeekKey, previousReached] = previousValue ?? []

    if (!reached) return
    if (weekKey === previousWeekKey && previousReached) return
    if (rewardedWeeks.value.includes(weekKey)) return

    fireConfetti(itemRef.value)
    addXp(10)
    rewardedWeeks.value = [...rewardedWeeks.value, weekKey]
  },
  { immediate: true },
)
</script>

<template>
  <div ref="itemRef">
    <Item
      variant="outline"
      class="flex-col items-stretch gap-6"
      @remove="props.onRemove?.(props.storageId)"
    >
      <div class="flex items-start justify-between gap-4">
        <div class="min-w-0">
          <EditableTitle
            class="pb-2 text-4xl font-bold"
            model-value="Work on Noni"
            :storage-key="`${storageId}:title`"
          />
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <p
                class="inline-flex cursor-pointer items-center text-sm text-muted-foreground"
                data-swapy-no-drag
              >
                {{ currentWeekCompletedCount }} of {{ target }} days this week
              </p>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start" class="w-44" data-swapy-no-drag>
              <div class="flex items-center justify-between gap-3 px-2 py-1.5">
                <span class="text-sm font-medium">Target: {{ target }}</span>
                <div class="flex items-center gap-1">
                  <Button variant="outline" size="icon-sm" data-swapy-no-drag @click="decreaseTarget">
                    <MinusIcon class="size-4" />
                  </Button>
                  <Button variant="outline" size="icon-sm" data-swapy-no-drag @click="increaseTarget">
                    <PlusIcon class="size-4" />
                  </Button>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div class="flex flex-col items-end gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button variant="outline" size="sm" class="gap-2" data-swapy-no-drag>
                {{ selectedMonthLabel }}
                <ChevronDownIcon class="size-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" class="w-48" data-swapy-no-drag>
              <DropdownMenuRadioGroup v-model="selectedMonthKey">
                <DropdownMenuRadioItem
                  v-for="month in monthOptions"
                  :key="month.key"
                  :value="month.key"
                >
                  {{ month.label }}
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div class="grid grid-cols-7 gap-1.5">
        <div
          v-for="weekday in weekdays"
          :key="weekday"
          class="pb-1 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground"
        >
          {{ weekday }}
        </div>

        <div
          v-for="index in leadingEmptyDays"
          :key="`empty-${index}`"
          class="h-8 rounded-lg border border-dashed border-transparent sm:h-8"
        />

        <label
          v-for="day in calendarDays"
          :key="day.day"
          class="flex h-8 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border bg-background/60 px-1.5 py-1 text-center transition-colors hover:border-primary/40 sm:h-14"
          :class="
            day.isToday
              ? 'border-user/30 bg-user/10'
              : day.isCurrentWeek
                ? 'bg-user/5'
                : 'border-border/70'
          "
          data-swapy-no-drag
        >
          <span class="text-[11px] font-medium text-muted-foreground">
            {{ day.day }}
          </span>
          <CheckCircle
            :model-value="day.checked"
            class="size-6"
            @update:model-value="toggleDay(day.day, $event)"
          />
        </label>
      </div>

      <Progress :model-value="progressValue" />
    </Item>
  </div>
</template>
