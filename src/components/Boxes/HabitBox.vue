<script setup lang="ts">
import { Item, ItemTitle } from '@/components/ui/BareBox'
import CheckCircle from '@/components/ui/checkbox/CheckCircle.vue'
import { Progress } from '@/components/ui/progress'
import { CheckboxGroupRoot } from 'reka-ui'
import { ref, computed, watch } from 'vue'
import EditableTitle from '../ui/EditableTitle.vue'
import { useLocalStorage } from '@/lib/useLocalStorage'
import { useConfetti } from '@/lib/useConfetti'
import { PlusIcon, MinusIcon } from 'lucide-vue-next'

const { fireConfetti } = useConfetti()
const itemRef = ref<HTMLElement | null>(null)

const days = [
  { id: 1, label: 'Mon' },
  { id: 2, label: 'Tue' },
  { id: 3, label: 'Wed' },
  { id: 4, label: 'Thu' },
  { id: 5, label: 'Fri' },
  { id: 6, label: 'Sat' },
  { id: 7, label: 'Sun' },
]

const selected = useLocalStorage<number[]>('days', [])
const target = ref(5)
const targetPercentage = computed(() => 100 / target.value)

function increaseTarget() {
  if (target.value === 7) return
  target.value++
}

function decreaseTarget() {
  console.log('clicked')
  if (target.value === 1) return
  target.value--
}
watch(
  () => selected.value.length,
  (newLength, oldLength) => {
    if (oldLength < target.value && newLength >= target.value) {
      fireConfetti(itemRef.value)
    }
  },
)
</script>

<template>
  <div ref="itemRef">
    <Item variant="outline" class="grid grid-rows-[auto_1fr] gap-0">
      <div class="justify-self-end flex items-center group" data-swapy-no-drag>
        <MinusIcon
          @click="decreaseTarget"
          class="overflow-hidden w-0 opacity-0 translate-x-2 group-hover:w-5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 ease-out"
        />
        <h1 class="mx-1 font-medium text-neutral-600 hidden group-hover:block">Target:</h1>
        <h1 class="mx-1 font-medium text-neutral-600">{{ target }}</h1>
        <PlusIcon
          @click="increaseTarget"
          class="overflow-hidden w-0 opacity-0 -translate-x-2 group-hover:w-5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 ease-out"
        />
      </div>

      <div class="flex flex-col place-self-center items-center text-center">
        <EditableTitle class="text-4xl font-bold pb-2" model-value="Work on Noni" />

        <div class="py-2 flex xl:gap-4 lg:gap-2 gap-4">
          <CheckboxGroupRoot v-for="day in days" :key="day.id" v-model="selected">
            <label data-swapy-no-drag>
              <CheckCircle :value="day.id" />
              <ItemTitle>{{ day.label }}</ItemTitle>
            </label>
          </CheckboxGroupRoot>
        </div>

        <Progress :model-value="Math.min(targetPercentage * selected.length, 100)" class="w-1/2" />
      </div>
    </Item>
  </div>
</template>
