<script setup lang="ts">
import { Item, ItemContent } from '@/components/ui/BareBox'
import { Input } from '../ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { computed, onMounted, onUnmounted, ref, watch, type PropType } from 'vue'
import Button from '../ui/button/Button.vue'
import type { Task } from '@/types'
import { useLocalStorage } from '@vueuse/core'
import EditableTitle from '../ui/EditableTitle.vue'
import { Trash2Icon } from 'lucide-vue-next'
import { ScrollArea } from '@/components/ui/scroll-area'

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
const sortCompleted = useLocalStorage<boolean>('todo-sort-completed', false)
const removeDoneYesterday = useLocalStorage<boolean>('todo-remove-done-yesterday', false)
const lastPruneDate = useLocalStorage('todo-last-prune-date', '')

const sortedTasks = computed(() => {
  if (!sortCompleted.value) {
    return tasks.value
  }

  return tasks.value
    .map((task, index) => ({ task, index }))
    .sort((a, b) => {
      if (a.task.done !== b.task.done) {
        return a.task.done ? 1 : -1
      }

      if (!a.task.done && !b.task.done) {
        const aCreated = a.task.createdAt ?? a.index
        const bCreated = b.task.createdAt ?? b.index
        return aCreated - bCreated
      }

      const aDoneAt = a.task.doneAt ?? 0
      const bDoneAt = b.task.doneAt ?? 0

      if (aDoneAt !== bDoneAt) {
        return bDoneAt - aDoneAt
      }

      return a.index - b.index
    })
    .map(({ task }) => task)
})

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
    createdAt: Date.now(),
  })
}

function removeTask(id: string) {
  const index = tasks.value.findIndex((task) => task.id === id)
  if (index !== -1) {
    tasks.value.splice(index, 1)
  }
}

function toggleTask(task: Task) {
  if (!task.done) {
    task.doneAt = Date.now()
    task.done = true
  } else {
    task.doneAt = undefined
    task.done = false

  }
}

function focusInput() {
  inputRef.value?.$el?.focus()
}

function getLocalDateKey(date = new Date()) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function pruneCompletedFromPreviousDay(force = false) {
  if (!removeDoneYesterday.value) {
    return
  }

  const todayKey = getLocalDateKey()
  if (!force && lastPruneDate.value === todayKey) {
    return
  }

  const startOfToday = new Date()
  startOfToday.setHours(0, 0, 0, 0)
  const cutoff = startOfToday.getTime()

  tasks.value = tasks.value.filter((task) => {
    if (!task.done) return true
    if (typeof task.doneAt !== 'number') return true
    return task.doneAt >= cutoff
  })

  lastPruneDate.value = todayKey
}

watch(removeDoneYesterday, (enabled) => {
  if (enabled) {
    pruneCompletedFromPreviousDay(true)
  }
})

watch(
  tasks,
  () => {
    pruneCompletedFromPreviousDay()
  },
  { deep: true },
)

function handleVisibilityOrFocus() {
  pruneCompletedFromPreviousDay()
}

onMounted(() => {
  window.addEventListener('focus', handleVisibilityOrFocus)
  document.addEventListener('visibilitychange', handleVisibilityOrFocus)
})

onUnmounted(() => {
  window.removeEventListener('focus', handleVisibilityOrFocus)
  document.removeEventListener('visibilitychange', handleVisibilityOrFocus)
})
</script>

<template>
  <Item
    variant="outline"
    class="grid grid-rows-[auto_1fr] h-full overflow-hidden flex-col items-stretch"
    @click="focusInput"
    @remove="props.onRemove?.(props.storageId)"
  >
    <EditableTitle model-value="To Do" :storage-key="`${storageId}:title`" @click.stop />
    <form @submit.prevent="formSubmitted" class="flex flex-col h-full min-h-0">
      <div class="flex-1 min-h-0">
        <div class="flex gap-2 items-center">
          <!-- <EditableTitle model-value="Title" class="font-bold text-base" @click.stop /> -->
          <!-- <EditableTitle model-value="Subtitle" class="font-normal text-base text-gray-400" /> -->
        </div>
        <ScrollArea class="h-full pr-2" data-swapy-no-drag>
          <div class="py-2" v-if="tasks">
            <div
              v-for="task in sortedTasks"
              :key="task.id"
              class="flex gap-3 items-center group p-0.5 rounded-sm hover:bg-accent cursor-pointer"
              data-swapy-no-drag
            @click="toggleTask(task)"
          >
            <Checkbox
              v-model="task.done"
              @click.stop
            />
            <ItemContent :class="{ 'line-through': task.done }">{{ task.title }}</ItemContent>
              <Trash2Icon
                @click.stop="removeTask(task.id)"
                class="h-4 overflow-hidden w-0 opacity-0 translate-x-2 group-hover:w-5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 ease-out"
              />
            </div>
          </div>
        </ScrollArea>
      </div>
      <div class="flex space-x-2 py-1" data-swapy-no-drag>
        <Input ref="inputRef" v-model="newTask" placeholder="New Task" />
        <Button type="submit"> Adhd </Button>
      </div>
    </form>
  </Item>
</template>
