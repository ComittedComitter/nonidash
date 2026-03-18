<script setup lang="ts">
import { Item, ItemContent } from '@/components/ui/BareBox'
import { Checkbox } from '@/components/ui/checkbox'

interface RoadmapItem {
  label: string
  done: boolean
}

interface RoadmapVersion {
  version: string
  subtitle: string
  items: RoadmapItem[]
}

const props = defineProps<{
  data: RoadmapVersion[]
  title: string
}>()
</script>

<template>
  <Item variant="outline" class="flex flex-col items-start p-10 content-start">
    <h2 class="text-3xl font-bold w-xl">{{ props.title }}</h2>
    <div class="grid grid-cols-5 gap-4">
      <div v-for="col in props.data" :key="col.version">
        <div class="text-lg font-bold">
          {{ col.version }}
          <span class="font-normal text-sm text-gray-400">{{ col.subtitle }}</span>
        </div>
        <div v-for="item in col.items" :key="item.label" class="flex gap-3 items-center">
          <Checkbox v-model="item.done" /><ItemContent :class="{ 'text-user': !item.done }">{{
            item.label
          }}</ItemContent>
        </div>
      </div>
    </div>
  </Item>
</template>
