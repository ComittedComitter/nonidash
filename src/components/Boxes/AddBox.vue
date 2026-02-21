<script setup lang="ts">
import { markRaw } from 'vue'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '../ui/button'

import HabitBox from '@/components/Boxes/HabitBox.vue'
import TimerBox from '@/components/Boxes/TimerBox.vue'
import TodoBox from '@/components/Boxes/TodoBox.vue'
import DateBox from '@/components/Boxes/DateBox.vue'
import RoadMap from '@/components/Boxes/RoadMap.vue'

const emit = defineEmits<{
  add: [component: ReturnType<typeof markRaw>, boxType: string]
}>()

function getUniqueId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

function addBox(component: ReturnType<typeof markRaw>, boxType: string) {
  const boxId = `${boxType}-${getUniqueId()}`
  emit('add', component, boxId)
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger data-swapy-no-drag>
      <Button variant="outline"> Add Box </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem @click="addBox(markRaw(HabitBox), 'habit')">Weekly Habit</DropdownMenuItem>
      <DropdownMenuItem @click="addBox(markRaw(TimerBox), 'timer')">Timer</DropdownMenuItem>
      <DropdownMenuItem @click="addBox(markRaw(TodoBox), 'todo')">To do</DropdownMenuItem>
      <DropdownMenuItem @click="addBox(markRaw(DateBox), 'date')">Today</DropdownMenuItem>
      <DropdownMenuItem @click="addBox(markRaw(RoadMap), 'roadmap')">Roadmap</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
