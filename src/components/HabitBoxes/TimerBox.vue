<script setup lang="ts">
import { Item } from '@/components/ui/BareBox'
import { Button } from '../ui/button'
import { ref, computed, watch } from 'vue'
import { type TimerState } from '@/types'
import EditableTitle from '../ui/EditableTitle.vue'
import EditableTimer from '../ui/EditableTimer.vue'
import Done from '@/assets/sounds/doneLong.mp3'

const duration = ref(10) // seconds
const now = ref(Date.now())

// --------------------
//     Persistence
// --------------------

const STORAGE_KEY = 'timer-state'
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

function stopTimer() {
  timerState.value.endTime = null
  timerState.value.remaining = duration.value
  timerState.value.running = false
}

// Auto-stop when finished
watch(remaining, (value) => {
  if (value === 0 && timerState.value.running) {
    playSound()
    stopTimer()
  }
})

// --------------------
//      Formatting
// --------------------

const timeFormatted = computed(() => formatTime(remaining.value))

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
  <Item variant="outline" class="grid grid-rows-[auto_1fr]">
    <EditableTitle model-value="Timer" class="text-3xl font-bold pl-2" />
    <div class="flex flex-col flex gap-3 justify-center items-center">
      <h3 v-if="timerState.running" class="text-5xl font-bold">{{ timeFormatted }}</h3>
      <EditableTimer
        v-else
        v-model="duration"
        @update:model-value="stopTimer"
        class="text-5xl font-bold"
      />
      <div class="flex gap-3" data-swapy-no-drag>
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
      </div>
    </div>
  </Item>
</template>
