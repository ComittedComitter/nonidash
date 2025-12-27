<script setup lang="ts">
import { Item, ItemContent } from '@/components/ui/BareBox'
import { Input } from '../ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { ref } from 'vue'
import Button from '../ui/button/Button.vue'
import type { Task } from '@/types'

const title = ref('To Do')
const newTask = ref('')
const tasks = ref<Task[]>([])

function formSubmitted() {
  if (newTask.value.trim()) {
    addTask(newTask.value)
    newTask.value = ''
  }
}

function addTask(newTask: string) {
  tasks.value.push({
    id: crypto.randomUUID(),
    title: newTask,
    done: false,
  })
}
</script>

<template>
  <Item variant="outline" class="items-start p-10 content-start">
    <h2 class="text-3xl font-bold w-xl">{{ title }}</h2>
    <div class="w-full">
      <form @submit.prevent="formSubmitted">
        <div class="text-lg font-bold">
          V1.0 <span class="font-normal text-sm text-gray-400">Foundations</span>
        </div>
        <div class="py-2" v-if="tasks">
          <div v-for="task in tasks" :key="task.id" class="flex gap-3 items-center">
            <Checkbox v-model="task.done" /><ItemContent>{{ task.title }}</ItemContent>
          </div>
        </div>
        <div class="flex items-center space-x-2 py-1" data-swapy-no-drag>
          <Input v-model="newTask" placeholder="New Task" />
          <Button type="submit"> Add </Button>
        </div>
      </form>
    </div>
  </Item>
</template>
