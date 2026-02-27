<script setup lang="ts">
import { Item } from '@/components/ui/BareBox'
import { ref, type PropType } from 'vue'

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
  <Item variant="outline" class="p-8 content-center" @remove="props.onRemove?.(props.storageId)">
    <h2 class="text-8xl font-bold w-full 3xl:text-9xl text-user">
      {{ time }}
    </h2>
    <h2 class="text-5xl text-neutral-400 font-bold">{{ today }} {{ dayNumber }}</h2>
  </Item>
</template>
