<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { ItemVariants } from '.'
import { Primitive } from 'reka-ui'
import { cn } from '@/lib/utils'
import { itemVariants } from '.'
import { X } from 'lucide-vue-next'

const props = withDefaults(
  defineProps<
    PrimitiveProps & {
      class?: HTMLAttributes['class']
      variant?: ItemVariants['variant']
      size?: ItemVariants['size']
    }
  >(),
  {
    as: 'div',
  },
)

const emit = defineEmits<{
  remove: []
}>()
</script>

<template>
  <Primitive
    data-slot="item"
    :as="as"
    :as-child="asChild"
    :class="
      cn(
        itemVariants({ variant, size }),
        props.class,
        'w-full',
        'min-h-[30vh]',
        'max-h-full',
        'backdrop-blur-sm',
        'p-7',
      )
    "
  >
    <button
      class="absolute top-2 right-2 opacity-0 group-hover/item:opacity-100 transition-opacity p-1 hover:bg-destructive/20 rounded-md"
      @click.stop="emit('remove')"
    >
      <X class="w-4 h-4 text-destructive" />
    </button>
    <slot />
  </Primitive>
</template>
