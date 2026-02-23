<template>
  <h1
    ref="titleElement"
    contenteditable="true"
    @input="onInput"
    @keydown.enter.prevent="onEnter"
    @keydown.esc.prevent="onEscape"
    class="rounded-md -m-1 p-1 text-3xl font-bold justify-self-start cursor-text outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
    data-swapy-no-drag
  ></h1>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { useLocalStorage } from '@/lib/useLocalStorage'

const props = defineProps<{
  modelValue?: string
  storageKey?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'save', value: string): void
}>()

const titleElement = ref<HTMLHeadingElement | null>(null)

const storedValue = props.storageKey
  ? useLocalStorage<string>(props.storageKey, props.modelValue ?? '')
  : null

const internalValue = computed({
  get: () => (storedValue ? storedValue.value : (props.modelValue ?? '')),
  set: (val) => {
    if (storedValue) storedValue.value = val
  },
})

let previousValue = internalValue.value

onMounted(() => {
  if (titleElement.value) {
    titleElement.value.innerText = internalValue.value
  }
})

watch(
  () => props.modelValue,
  (newVal) => {
    if (!storedValue && newVal !== undefined) {
      if (titleElement.value && titleElement.value.innerText !== newVal) {
        titleElement.value.innerText = newVal
      }
    }
  },
)

function onInput(e: Event) {
  const target = e.target as HTMLHeadingElement
  const value = target.innerText
  if (storedValue) {
    storedValue.value = value
  } else {
    emit('update:modelValue', value)
  }
}

function onEnter() {
  previousValue = internalValue.value
  titleElement.value?.blur()
  emit('save', internalValue.value)
}

function onEscape() {
  if (storedValue) {
    storedValue.value = previousValue
  }
  if (titleElement.value) titleElement.value.innerText = previousValue
  titleElement.value?.blur()
}
</script>
