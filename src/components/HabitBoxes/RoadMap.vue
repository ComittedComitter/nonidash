<script setup lang="ts">
import { Item, ItemContent } from '@/components/ui/BareBox'
import { Checkbox } from '@/components/ui/checkbox'
</script>

<template>
  <Item variant="outline" class="items-start p-10 content-start row-span-2">
    <h2 class="text-3xl font-bold w-xl">Noni Roadmap</h2>
    <div class="grid grid-cols-2 gap-4">
      <div class="">
        <div class="text-lg font-bold">
          V1.0 <span class="font-normal text-sm text-gray-400">Foundations</span>
        </div>
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
      <div class="">
        <div class="text-lg font-bold">
          V1.1 <span class="font-normal text-sm text-gray-400">Interaction</span>
        </div>
        <div class="flex gap-3 items-center">
          <Checkbox :default-value="true" /><ItemContent>Progress Bar</ItemContent>
        </div>
        <div class="flex gap-3 items-center">
          <Checkbox :default-value="true" /><ItemContent>Rearrangeable Boxes</ItemContent>
        </div>
        <div class="flex gap-3 items-center">
          <Checkbox :default-value="true" /><ItemContent>'Add box' functionality</ItemContent>
        </div>
        <div class="flex gap-3 items-center">
          <Checkbox :default-value="true" /><ItemContent>Anti-drag zones</ItemContent>
        </div>
      </div>
      <div class="">
        <div class="text-lg font-bold">
          V1.2 <span class="font-normal text-sm text-gray-400">Todo</span>
        </div>

        <div class="flex gap-3 items-center">
          <Checkbox :default-value="false" /><ItemContent>Local Storage</ItemContent>
        </div>
        <div class="flex gap-3 items-center">
          <Checkbox :default-value="true" /><ItemContent>Type in UI</ItemContent>
        </div>
        <div class="flex gap-3 items-center">
          <Checkbox :default-value="false" /><ItemContent>Manage sizing somehow</ItemContent>
        </div>
        <div class="flex gap-3 items-center">
          <Checkbox :default-value="false" /><ItemContent>Add Column in UI</ItemContent>
        </div>
      </div>
      <div class="">
        <div class="text-lg font-bold">
          V1.3 <span class="font-normal text-sm text-gray-400">Habits</span>
        </div>
        <div class="flex gap-3 items-center">
          <Checkbox :default-value="false" /><ItemContent>Local Storage</ItemContent>
        </div>
        <div class="flex gap-3 items-center">
          <Checkbox :default-value="false" /><ItemContent>Set target</ItemContent>
        </div>
        <div class="flex gap-3 items-center">
          <Checkbox :default-value="false" /><ItemContent>Change Title</ItemContent>
        </div>
        <div class="flex gap-3 items-center">
          <Checkbox :default-value="false" /><ItemContent>Confetti</ItemContent>
        </div>
      </div>
      <div class="">
        <div class="text-lg font-bold">
          V1.4 <span class="font-normal text-sm text-gray-400">Timer</span>
        </div>
        <div class="flex gap-3 items-center">
          <Checkbox :default-value="false" /><ItemContent>Local Storage</ItemContent>
        </div>
        <div class="flex gap-3 items-center">
          <Checkbox :default-value="false" /><ItemContent>Set duration</ItemContent>
        </div>
        <div class="flex gap-3 items-center">
          <Checkbox :default-value="false" /><ItemContent>Notification</ItemContent>
        </div>
        <div class="flex gap-3 items-center">
          <Checkbox :default-value="false" /><ItemContent>Confirmation and Total</ItemContent>
        </div>
      </div>
      <div>
        <div class="text-lg font-bold">
          V1.5 <span class="font-normal text-sm text-gray-400">Journal</span>
        </div>
        <div class="flex gap-3 items-center">
          <Checkbox :default-value="false" /><ItemContent>Local Storage</ItemContent>
        </div>
        <div class="flex gap-3 items-center">
          <Checkbox :default-value="false" /><ItemContent>Text entry</ItemContent>
        </div>
        <div class="flex gap-3 items-center">
          <Checkbox :default-value="false" /><ItemContent>Daily note UI</ItemContent>
        </div>
        <div class="flex gap-3 items-center">
          <Checkbox :default-value="false" /><ItemContent>Daily prompt (+ toggle)</ItemContent>
        </div>
      </div>
      <div>
        <div class="text-lg font-bold">
          V1.6 <span class="font-normal text-sm text-gray-400">XP system</span>
        </div>
        <div class="flex gap-3 items-center">
          <Checkbox :default-value="false" /><ItemContent>Progress Bar to sidebar</ItemContent>
        </div>
        <div class="flex gap-3 items-center">
          <Checkbox :default-value="false" /><ItemContent>Habit xp once a day</ItemContent>
        </div>
        <div class="flex gap-3 items-center">
          <Checkbox :default-value="false" /><ItemContent>Level Display</ItemContent>
        </div>
        <div class="flex gap-3 items-center">
          <Checkbox :default-value="false" /><ItemContent>Levelup Animation</ItemContent>
        </div>
      </div>
      <div>
        <div class="text-lg font-bold">
          V1.7 <span class="font-normal text-sm text-gray-400">Color</span>
        </div>
        <div class="flex gap-3 items-center">
          <Checkbox :default-value="false" /><ItemContent>Color Picker</ItemContent>
        </div>
        <div class="flex gap-3 items-center">
          <Checkbox :default-value="false" /><ItemContent>Color on completetion</ItemContent>
        </div>
        <div class="flex gap-3 items-center">
          <Checkbox :default-value="false" /><ItemContent>XP Bar color</ItemContent>
        </div>
        <div class="flex gap-3 items-center">
          <Checkbox :default-value="false" /><ItemContent>Avatar Picker</ItemContent>
        </div>
      </div>
    </div>
  </Item>
</template>
