<script setup lang="ts">
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemHeader,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/BareBox'
import { Checkbox } from '@/components/ui/checkbox'
</script>

<template>
  <Item variant="outline" class="flex flex-col p-12 items-start content-start">
    <h2 class="text-3xl font-bold pb-1">To Do</h2>
    <div class="flex gap-3 items-center"><Checkbox /><ItemContent>Habit tracker</ItemContent></div>
    <div class="flex gap-3 items-center"><Checkbox /><ItemContent>Timer</ItemContent></div>
    <div class="flex gap-3 items-center"><Checkbox /><ItemContent>Todo List</ItemContent></div>
    <div class="flex gap-3 items-center"><Checkbox /><ItemContent>Date and Clock</ItemContent></div>
  </Item>
</template>
