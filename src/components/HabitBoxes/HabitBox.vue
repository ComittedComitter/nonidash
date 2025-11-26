<script setup lang="ts">
import { Item, ItemTitle } from '@/components/ui/BareBox'
import CheckCircle from '@/components/ui/checkbox/CheckCircle.vue'
import { Progress } from '@/components/ui/progress'
import { CheckboxGroupRoot } from 'reka-ui'
import { ref } from 'vue'

const days = [
  { id: 1, label: 'Mon' },
  { id: 2, label: 'Tue' },
  { id: 3, label: 'Wed' },
  { id: 4, label: 'Thu' },
  { id: 5, label: 'Fri' },
  { id: 6, label: 'Sat' },
  { id: 7, label: 'Sun' },
]

const selected = ref<number[]>([])
const target = ref(5)
const targetPercentage = 100 / target.value
</script>

<template>
  <Item variant="outline" class="flex flex-col justify-center">
    <div>
      <h2 class="text-4xl font-bold">Read</h2>
      <ItemTitle> Target: {{ target }}</ItemTitle>
    </div>
    <div class="flex gap-6">
      <CheckboxGroupRoot v-for="day in days" :key="day.id" v-model="selected">
        <label>
          <CheckCircle :value="day.id" />
          <ItemTitle>{{ day.label }}</ItemTitle>
        </label>
      </CheckboxGroupRoot>
    </div>
    <Progress :model-value="Math.min(targetPercentage * selected.length, 100)" class="w-1/2 mt-5" />
  </Item>
</template>
