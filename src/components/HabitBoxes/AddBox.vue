<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Item } from '@/components/ui/BareBox'
import { Button } from '../ui/button'
import { createApp } from 'vue'

import HabitBox from '@/components/HabitBoxes/HabitBox.vue'
import TimerBox from '@/components/HabitBoxes/TimerBox.vue'
import TodoBox from '@/components/HabitBoxes/TodoBox.vue'
import DateBox from '@/components/HabitBoxes/DateBox.vue'

function addBox(variant) {
  const container = document.querySelector('#dashboard')

  if (!container) {
    throw new Error('Container not found')
  }
  const mountPoint = document.createElement('div')
  container.appendChild(mountPoint)

  const box = createApp(variant)
  box.mount(mountPoint)

  return () => {
    box.unmount()
    mountPoint.remove()
  }
}
</script>

<template>
  <Item variant="outline" class="justify-center">
    <DropdownMenu>
      <DropdownMenuTrigger data-swapy-no-drag>
        <Button variant="outline"> Add Box </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem @click="addBox(HabitBox)">Weekly Habit</DropdownMenuItem>
        <DropdownMenuItem @click="addBox(TimerBox)">Timer</DropdownMenuItem>
        <DropdownMenuItem @click="addBox(TodoBox)">To do</DropdownMenuItem>
        <DropdownMenuItem @click="addBox(DateBox)">Today</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </Item>
</template>
