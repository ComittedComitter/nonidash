<script setup lang="ts">
import { Item } from '@/components/ui/BareBox'
import { ref } from 'vue'

const today = ref(new Date().toLocaleDateString('en-US', { weekday: 'long' }))
const dayNumber = new Date().getDate()
const time = ref(getTime())

function getTime() {
  return new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

// Update every 10 seconds
setInterval(() => {
  time.value = getTime()
}, 10000)
</script>

<template>
  <Item variant="outline" class="p-8 content-center">
    <h2 class="text-6xl font-bold w-xl">{{ today }} {{ dayNumber }}</h2>
    <h2 class="text-6xl font-bold text-neutral-400 pb-1 w-xl">
      {{ time }}
    </h2>
  </Item>
</template>
