<script setup lang="ts">
import { computed } from 'vue'
import { Progress } from '@/components/ui/progress'
import { useXp } from '@/lib/useXp'

const props = withDefaults(
  defineProps<{
    maxXp?: number
  }>(),
  {
    maxXp: 100,
  },
)

const { xp, level } = useXp()

const progress = computed(() => (xp.value / props.maxXp) * 100)
</script>

<template>
  <div class="px-2 py-1.5">
    <div class="flex items-center justify-between text-xs text-muted-foreground mb-1">
      <span class="font-medium text-foreground">Level {{ level }}</span>
      <span>{{ xp }} / {{ maxXp }} XP</span>
    </div>
    <Progress :model-value="progress" />
  </div>
</template>
