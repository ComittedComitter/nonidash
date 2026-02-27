<script setup lang="ts">
import { Item, ItemContent } from '@/components/ui/BareBox'
import { Input } from '../ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { ref, type PropType } from 'vue'
import Button from '../ui/button/Button.vue'
import type { Task } from '@/types'
import { useLocalStorage } from '@/lib/useLocalStorage'
import EditableTitle from '../ui/EditableTitle.vue'
import { Trash2Icon } from 'lucide-vue-next'

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

const newTask = ref('')
const inputRef = ref<InstanceType<typeof Input> | null>(null)
const storageKey = `TodoBox:${props.storageId}`
const tasks = useLocalStorage<Task[]>(storageKey, [])

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

function removeTask(id: string) {
  const index = tasks.value.findIndex((task) => task.id === id)
  if (index !== -1) {
    tasks.value.splice(index, 1)
  }
}

function toggleTask(task: Task) {
  task.done = !task.done
}

function focusInput() {
  inputRef.value?.$el?.focus()
}
</script>

<template>
  <Item
    variant="outline"
    class="grid grid-rows-[auto_1fr]"
    @click="focusInput"
    @remove="props.onRemove?.(props.storageId)"
  >
    <EditableTitle model-value="To Do" :storage-key="`${storageId}:title`" @click.stop />
    <form @submit.prevent="formSubmitted" class="flex flex-col justify-between h-full">
      <div>
        <div class="flex gap-2 items-center">
          <EditableTitle model-value="Title" class="font-bold text-base" @click.stop />
          <!-- <EditableTitle model-value="Subtitle" class="font-normal text-base text-gray-400" /> -->
        </div>
        <div class="py-2" v-if="tasks">
          <div
            v-for="task in tasks"
            :key="task.id"
            class="flex gap-3 items-center group p-0.5 rounded-sm hover:bg-accent cursor-pointer"
            data-swapy-no-drag
            @click="toggleTask(task)"
          >
            <Checkbox v-model="task.done" @click.stop /><ItemContent
              :class="{ 'line-through': task.done }"
              >{{ task.title }}</ItemContent
            >
            <Trash2Icon
              @click.stop="removeTask(task.id)"
              class="h-4 overflow-hidden w-0 opacity-0 translate-x-2 group-hover:w-5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 ease-out"
            />
          </div>
        </div>
      </div>
      <div class="flex space-x-2 py-1" data-swapy-no-drag>
        <Input ref="inputRef" v-model="newTask" placeholder="New Task" />
        <Button type="submit"> Add </Button>
      </div>
    </form>
  </Item>
</template>
