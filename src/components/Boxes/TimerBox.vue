<script setup lang="ts">
import { Item } from '@/components/ui/BareBox'
import { Button } from '../ui/button'
import { ref, computed, watch, type PropType } from 'vue'
import { type TimerState } from '@/types'
import EditableTitle from '../ui/EditableTitle.vue'
import EditableTimer from '../ui/EditableTimer.vue'
import Done from '@/assets/sounds/doneLong.mp3'
import { useConfetti } from '@/lib/useConfetti'
import { useXp } from '@/lib/useXp'

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

const { fireConfetti } = useConfetti()
const itemRef = ref<HTMLElement | null>(null)
const { addXp } = useXp()

const DURATION_KEY = `timer-duration:${props.storageId}`
const duration = ref<number>(loadDuration())

function saveDuration(time: number) {
  localStorage.setItem(DURATION_KEY, JSON.stringify(time))
}

function loadDuration(): number {
  const saved = localStorage.getItem(DURATION_KEY)
  return saved ? JSON.parse(saved) : 1800
}

watch(duration, saveDuration)

const now = ref(Date.now())
const finished = ref(false)

// --------------------
//     Total Time
// --------------------

const TOTAL_TIME_KEY = `timer-total-time:${props.storageId}`
const totalTime = ref<number>(loadTotalTime())
watch(totalTime, saveTotalTime, { deep: true })

function saveTotalTime(time: number) {
  localStorage.setItem(TOTAL_TIME_KEY, JSON.stringify(time))
}

function loadTotalTime(): number {
  const saved = localStorage.getItem(TOTAL_TIME_KEY)
  return saved ? JSON.parse(saved) : 0
}

function addToTotal(seconds: number) {
  totalTime.value += seconds
}

// --------------------
//     Persistence
// --------------------

const STORAGE_KEY = `timer-state:${props.storageId}`
const timerState = ref<TimerState>(loadTimer())
watch(timerState, saveTimer, { deep: true })

function saveTimer(state: TimerState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

function loadTimer(): TimerState {
  const saved = localStorage.getItem(STORAGE_KEY)
  return saved ? JSON.parse(saved) : { endTime: null, remaining: duration.value, running: false }
}

// --------------------
// Countdown calculation
// --------------------

const remaining = computed(() => {
  if (!timerState.value.running || timerState.value.endTime === null) {
    return timerState.value.remaining
  }

  const diffMs = timerState.value.endTime - now.value
  return Math.max(0, Math.floor(diffMs / 1000))
})

setInterval(() => {
  now.value = Date.now()
}, 1000)

// --------------------
//       Controls
// --------------------

function startTimer() {
  if (timerState.value.running) return
  timerState.value.endTime = Date.now() + timerState.value.remaining * 1000
  timerState.value.running = true
}

function pauseTimer() {
  if (!timerState.value.running) return
  timerState.value.remaining = remaining.value
  timerState.value.endTime = null
  timerState.value.running = false
}

// Auto-stop when finished
watch(remaining, (value) => {
  if (value === 0 && timerState.value.running) {
    playSound()
    finished.value = true
    timerState.value.running = false
  }
})

// --------------------
// Add or discard time
// to the total
// --------------------
function addTime() {
  const elapsed = duration.value
  addToTotal(elapsed)
  fireConfetti(itemRef.value)
  resetTimer()
  addXp(10)
}

function discardTime() {
  resetTimer()
}

function resetTimer() {
  timerState.value.endTime = null
  timerState.value.remaining = duration.value
  timerState.value.running = false
  finished.value = false
}

function stopTimer() {
  resetTimer()
}

// --------------------
//      Formatting
// --------------------

const timeFormatted = computed(() => formatTime(remaining.value))
const totalTimeFormatted = computed(() => formatTime(totalTime.value))
const displayTime = computed(() =>
  timerState.value.running ? remaining.value : timerState.value.remaining,
)

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}
// --------------------
//     Notification
// --------------------

const playSound = () => {
  const audio = new Audio(Done)
  audio.play()
}
</script>

<template>
  <div ref="itemRef">
    <Item
      variant="outline"
      class="grid grid-rows-[auto_1fr]"
      @remove="props.onRemove?.(props.storageId)"
    >
      <div class="flex justify-between">
        <EditableTitle
          model-value="Timer"
          class="text-3xl font-bold pl-2"
          :storage-key="`${storageId}:title`"
        />
        <div v-if="!finished" class="text-sm text-muted">
          Weekly Total: {{ totalTimeFormatted }}
        </div>
      </div>
      <div class="flex flex-col gap-3 justify-center items-center">
        <div v-if="finished" class="text-2xl font-bold text-red-700">Finished!</div>
        <h3 v-else-if="timerState.running" class="text-5xl font-bold">{{ timeFormatted }}</h3>
        <EditableTimer
          v-else-if="!finished"
          :model-value="displayTime"
          @update:model-value="
            (val) => {
              duration = val
              stopTimer()
            }
          "
          class="text-5xl font-bold"
        />
        <div class="flex gap-3" data-swapy-no-drag>
          <template v-if="finished">
            <Button @click="addTime">Add</Button>
            <Button @click="discardTime" variant="outline">Do not add</Button>
          </template>
          <template v-else>
            <Button v-if="!timerState.running" @click="startTimer">{{
              timerState.remaining === duration ? 'Start' : 'Resume'
            }}</Button>
            <Button v-if="timerState.running" @click="pauseTimer" variant="outline">Pause</Button>
            <Button
              v-if="timerState.endTime || timerState.remaining !== duration"
              @click="stopTimer"
              variant="outline"
              >Stop</Button
            >
          </template>
        </div>
      </div>
    </Item>
  </div>
</template>
