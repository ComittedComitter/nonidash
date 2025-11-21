<script setup lang="ts">
import { Item } from '@/components/ui/BareBox'
import { Button } from '../ui/button'
import { ref, computed } from 'vue'

const duration = 1800 // seconds
const timeLeft = ref(duration)
let interval: ReturnType<typeof setInterval> | null = null
const paused = ref<boolean>(false)
const started = ref<boolean>(false)
const goText = ref<string>('Start')

function startTimer() {
  if (interval) return
  started.value = true
  paused.value = false
  interval = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--
    } else {
      pauseTimer()
    }
  }, 1000)
}

function pauseTimer() {
  if (interval) clearInterval(interval)
  interval = null
  paused.value = true
  goText.value = 'Resume'
}

function stopTimer() {
  pauseTimer()
  timeLeft.value = duration
  goText.value = 'Start'
  started.value = false
  paused.value = false
}
const timeFormatted = computed(() => formatTime(timeLeft.value))
function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}
</script>

<template>
  <Item variant="outline" class="flex flex-col justify-center">
    <h3 class="text-5xl font-bold">{{ timeFormatted }}</h3>
    <div class="flex gap-3">
      <Button v-if="!started || paused" @click="startTimer">{{ goText }}</Button>
      <Button v-if="!paused && started" @click="pauseTimer" variant="outline">Pause</Button>
      <Button v-if="started" @click="stopTimer" variant="outline">Stop</Button>
    </div>
  </Item>
</template>
