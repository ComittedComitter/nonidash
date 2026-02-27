<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'

const props = defineProps<{
  modelValue: number
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()

const elRef = ref<HTMLSpanElement | null>(null)
const isEditing = ref(false)

/* ---------- helpers ---------- */

const formatDuration = (seconds: number): string => {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
}

const parseDuration = (value: string): number | null => {
  if (/^\d+$/.test(value)) return Number(value)

  const m = value.match(/^(\d+):(\d{1,2})$/)
  if (!m) return null

  const min = Number(m[1])
  const sec = Number(m[2])
  if (sec >= 60) return null
  // hier zou ik overflow kunnen optellen

  return min * 60 + sec
}

/* ---------- lifecycle ---------- */

onMounted(() => {
  if (elRef.value) {
    elRef.value.textContent = formatDuration(props.modelValue)
  }
})

watch(
  () => props.modelValue,
  (v) => {
    if (!isEditing.value && elRef.value) {
      elRef.value.textContent = formatDuration(v)
    }
  },
)

/* ---------- editing ---------- */

const startEditing = () => {
  if (!elRef.value) return
  isEditing.value = true
  elRef.value.focus()
}

const save = () => {
  const el = elRef.value
  if (!el) return

  const raw = el.textContent?.trim() ?? ''
  const parsed = parseDuration(raw)

  if (parsed !== null) {
    emit('update:modelValue', parsed)
    el.textContent = formatDuration(parsed)
  } else {
    el.textContent = formatDuration(props.modelValue)
  }

  isEditing.value = false
}

const cancel = () => {
  if (elRef.value) {
    elRef.value.textContent = formatDuration(props.modelValue)
  }
  isEditing.value = false
}

/* ---------- input filtering ---------- */

const onBeforeInput = (e: InputEvent) => {
  if (!e.data) return

  // block newlines
  if (e.inputType === 'insertParagraph') {
    e.preventDefault()
    save()
    return
  }

  // allow only digits and colon
  if (!/[\d:]/.test(e.data)) {
    e.preventDefault()
  }
}

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    e.preventDefault()
    save()
  }
  if (e.key === 'Escape') {
    e.preventDefault()
    cancel()
  }
}
</script>

<template>
  <span
    ref="elRef"
    class="timer"
    role="textbox"
    aria-label="Timer duration"
    tabindex="0"
    spellcheck="false"
    contenteditable
    data-swapy-no-drag
    :data-editing="isEditing"
    @click="startEditing"
    @blur="save"
    @keydown="onKeydown"
    @beforeinput="onBeforeInput"
  />
</template>
