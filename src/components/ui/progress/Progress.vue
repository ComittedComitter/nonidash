<script setup lang="ts">
import type { ProgressRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { ProgressIndicator, ProgressRoot } from 'reka-ui'
import { cn } from '@/lib/utils'
import { ref, watch } from 'vue'

const props = withDefaults(defineProps<ProgressRootProps & { class?: HTMLAttributes['class'] }>(), {
  modelValue: 0,
})

const delegatedProps = reactiveOmit(props, 'class')

const isTransitioning = ref(false)

watch(
  () => props.modelValue,
  (newVal, oldVal) => {
    if ((newVal ?? 0) >= (oldVal ?? 0)) {
      isTransitioning.value = true
      setTimeout(() => {
        isTransitioning.value = false
      }, 1000)
    }
  },
)
</script>

<template>
  <ProgressRoot
    data-slot="progress"
    class="bg-primary/10 relative h-2 w-full overflow-hidden rounded-full h1.5"
  >
    <ProgressIndicator
      data-slot="progress-indicator"
      v-bind="delegatedProps"
      :class="
        cn(
          'h-full w-full flex-1 transition-all duration-300 bg-primary',
          props.class,
          isTransitioning && 'bg-user',
        )
      "
      :style="`transform: translateX(-${100 - (props.modelValue ?? 0)}%);`"
    />
  </ProgressRoot>
</template>
