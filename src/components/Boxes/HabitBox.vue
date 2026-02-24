<script setup lang="ts">
import { Item, ItemTitle } from '@/components/ui/BareBox'
import CheckCircle from '@/components/ui/checkbox/CheckCircle.vue'
import { Progress } from '@/components/ui/progress'
import { CheckboxGroupRoot } from 'reka-ui'
import { ref, computed, watch, type PropType } from 'vue'
import EditableTitle from '../ui/EditableTitle.vue'
import { useLocalStorage } from '@/lib/useLocalStorage'
import { useConfetti } from '@/lib/useConfetti'
import { useXp } from '@/lib/useXp'
import { PlusIcon, MinusIcon } from 'lucide-vue-next'

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
const target = useLocalStorage(`habitbox:${props.storageId}:target`, 5)
const lastXpDate = useLocalStorage<number | null>(`habitbox:${props.storageId}:lastXp`, null)
const { addXp } = useXp()
const targetPercentage = computed(() => 100 / target.value)

function getWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  const dayNum = d.getUTCDay() || 7
  d.setUTCDate(d.getUTCDate() + 4 - dayNum)
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7)
}

function isNewWeek(timestamp: number | null): boolean {
  if (!timestamp) return true
  const lastDate = new Date(timestamp)
  const now = new Date()
  return (
    getWeekNumber(lastDate) !== getWeekNumber(now) || lastDate.getFullYear() !== now.getFullYear()
  )
}

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
      if (isNewWeek(lastXpDate.value)) {
        fireConfetti(itemRef.value)
        addXp(10)
        lastXpDate.value = Date.now()
      }
    }
  },
)
</script>

<template>
  <div ref="itemRef">
    <Item
      variant="outline"
      class="grid grid-rows-[auto_1fr] gap-0"
      @remove="props.onRemove?.(props.storageId)"
    >
      <div class="justify-self-end flex items-center group" data-swapy-no-drag>
        <MinusIcon
          @click="decreaseTarget"
          class="overflow-hidden w-0 opacity-0 translate-x-2 group-hover:w-5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 ease-out"
        />
        <h1 class="mx-1 font-medium text-muted group-hover:text-muted-foreground">
          Target: {{ target }}
        </h1>
        <PlusIcon
          @click="increaseTarget"
          class="overflow-hidden w-0 opacity-0 -translate-x-2 group-hover:w-5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 ease-out"
        />
      </div>

      <div class="flex flex-col place-self-center items-center text-center">
        <EditableTitle
          class="text-4xl font-bold pb-2"
          model-value="Work on Noni"
          :storage-key="`${storageId}:title`"
        />
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
