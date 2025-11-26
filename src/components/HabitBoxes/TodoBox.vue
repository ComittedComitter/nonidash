<script setup lang="ts">
import { Item, ItemContent } from '@/components/ui/BareBox'
import { Checkbox } from '@/components/ui/checkbox'
</script>

<template>
  <Item variant="outline" class="items-start p-10 content-start">
    <h2 class="text-3xl font-bold pb-1 w-xl">To Do</h2>
    <div class="flex flex-col gap-2">
      <div class="flex gap-3 items-center">
        <Checkbox :default-value="true" /><ItemContent>Habit tracker</ItemContent>
      </div>
      <div class="flex gap-3 items-center">
        <Checkbox :default-value="true" /><ItemContent>Timer</ItemContent>
      </div>
      <div class="flex gap-3 items-center">
        <Checkbox :default-value="true" /><ItemContent>Todo List</ItemContent>
      </div>
      <div class="flex gap-3 items-center">
        <Checkbox :default-value="true" /><ItemContent>Date and Clock</ItemContent>
      </div>
    </div>
  </Item>
</template>
