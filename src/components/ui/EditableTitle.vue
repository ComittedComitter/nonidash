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
import { ref, onMounted, watch } from 'vue'

interface Props {
  modelValue: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'save', value: string): void
}>()

const titleElement = ref<HTMLHeadingElement | null>(null)
const internalValue = ref(props.modelValue)

let previousValue = props.modelValue

// Initialize contenteditable text on mount
onMounted(() => {
  if (titleElement.value) {
    titleElement.value.innerText = internalValue.value
  }
})

// Watch for external changes to modelValue
watch(
  () => props.modelValue,
  (newVal) => {
    internalValue.value = newVal
    if (titleElement.value && titleElement.value.innerText !== newVal) {
      titleElement.value.innerText = newVal
    }
  },
)

function onInput(e: Event) {
  const target = e.target as HTMLHeadingElement
  internalValue.value = target.innerText
  emit('update:modelValue', internalValue.value)
}

function onEnter() {
  previousValue = internalValue.value
  titleElement.value?.blur()
  emit('save', internalValue.value)
}

function onEscape() {
  internalValue.value = previousValue
  if (titleElement.value) titleElement.value.innerText = previousValue
  titleElement.value?.blur()
}
</script>
