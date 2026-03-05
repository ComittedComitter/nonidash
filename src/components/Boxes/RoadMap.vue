<script setup lang="ts">
import { Item, ItemContent } from '@/components/ui/BareBox'
import { Checkbox } from '@/components/ui/checkbox'
import type { PropType } from 'vue'

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
</script>

<template>
  <Item
    variant="outline"
    class="items-start p-10 content-start"
    @remove="props.onRemove?.(props.storageId)"
  >
    <h2 class="text-3xl font-bold w-xl">Noni Roadmap</h2>
    <div class="grid grid-cols-10 gap-1">
      <div class="">
        <div class="text-lg font-bold">
          V0.1 <span class="font-normal text-sm text-gray-400">Foundations</span>
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
          V0.2 <span class="font-normal text-sm text-gray-400">Interaction</span>
        </div>
        <div class="flex gap-3 items-center">
          <Checkbox :default-value="true" /><ItemContent>Progress Bar</ItemContent>
        </div>
        <div class="flex gap-3 items-center">
          <Checkbox :default-value="true" /><ItemContent>Move boxes</ItemContent>
        </div>
        <div class="flex gap-3 items-center">
          <Checkbox :default-value="true" /><ItemContent>'Add box' button</ItemContent>
        </div>
        <div class="flex gap-3 items-center">
          <Checkbox :default-value="true" /><ItemContent>Anti-drag zones</ItemContent>
        </div>
      </div>
      <div class="">
        <div class="text-lg font-bold">
          V0.3 <span class="font-normal text-sm text-gray-400">Todo</span>
        </div>

        <div class="flex gap-3 items-center">
          <Checkbox :default-value="true" /><ItemContent>Local Storage</ItemContent>
        </div>
        <div class="flex gap-3 items-center">
          <Checkbox :default-value="true" /><ItemContent>Type in UI</ItemContent>
        </div>
        <div class="flex gap-3 items-center">
          <Checkbox :default-value="true" /><ItemContent>Individual storage</ItemContent>
        </div>
        <div class="flex gap-3 items-center">
          <Checkbox :default-value="true" /><ItemContent>Delete Tasks</ItemContent>
        </div>
      </div>
      <div class="">
        <div class="text-lg font-bold">
          V0.4 <span class="font-normal text-sm text-gray-400">Habits</span>
        </div>
        <div class="flex gap-3 items-center">
          <Checkbox :default-value="true" /><ItemContent>Local Storage</ItemContent>
        </div>
        <div class="flex gap-3 items-center">
          <Checkbox :default-value="true" /><ItemContent>Set target</ItemContent>
        </div>
        <div class="flex gap-3 items-center">
          <Checkbox :default-value="true" /><ItemContent>Change Title</ItemContent>
        </div>
        <div class="flex gap-3 items-center">
          <Checkbox :default-value="true" /><ItemContent>Confetti</ItemContent>
        </div>
      </div>
      <div class="">
        <div class="text-lg font-bold">
          V0.5 <span class="font-normal text-sm text-gray-400">Timer</span>
        </div>
        <div class="flex gap-3 items-center">
          <Checkbox :default-value="true" /><ItemContent>Local Storage</ItemContent>
        </div>
        <div class="flex gap-3 items-center">
          <Checkbox :default-value="true" /><ItemContent>Set duration</ItemContent>
        </div>
        <div class="flex gap-3 items-center">
          <Checkbox :default-value="true" /><ItemContent>Notification</ItemContent>
        </div>
        <div class="flex gap-3 ite<ms-center">
          <Checkbox :default-value="true" /><ItemContent>Confirm and Total</ItemContent>
        </div>
      </div>
      <div>
        <div class="text-lg font-bold">
          V0.6 <span class="font-normal text-sm text-gray-400">Journal</span>
        </div>
        <div class="flex gap-3 items-center">
          <Checkbox :default-value="true" /><ItemContent>Local Storage</ItemContent>
        </div>
        <div class="flex gap-3 items-center">
          <Checkbox :default-value="true" /><ItemContent>Text entry</ItemContent>
        </div>
        <div class="flex gap-3 items-center">
          <Checkbox :default-value="true" /><ItemContent>Daily note UI</ItemContent>
        </div>
        <div class="flex gap-3 items-center">
          <Checkbox :default-value="true" /><ItemContent>Daily prompt</ItemContent>
        </div>
      </div>
      <div>
        <div class="text-lg font-bold">
          V0.7 <span class="font-normal text-sm text-gray-400">XP system</span>
        </div>
        <div class="flex gap-3 items-center">
          <Checkbox :default-value="true" /><ItemContent>XP bar in sidebar</ItemContent>
        </div>
        <div class="flex gap-3 items-center">
          <Checkbox :default-value="true" /><ItemContent>Habit xp once</ItemContent>
        </div>
        <div class="flex gap-3 items-center">
          <Checkbox :default-value="true" /><ItemContent>Level Display</ItemContent>
        </div>
        <div class="flex gap-3 items-center">
          <Checkbox :default-value="false" /><ItemContent>Levelup Animation</ItemContent>
        </div>
      </div>
      <div>
        <div class="text-lg font-bold">
          V0.8 <span class="font-normal text-sm text-gray-400">Color</span>
        </div>
        <div class="flex gap-3 items-center">
          <Checkbox :default-value="true" /><ItemContent>Color Picker</ItemContent>
        </div>
        <div class="flex gap-3 items-center">
          <Checkbox :default-value="true" /><ItemContent>Color in UI</ItemContent>
        </div>
        <div class="flex gap-3 items-center">
          <Checkbox :default-value="true" /><ItemContent>XP Bar color</ItemContent>
        </div>
        <div class="flex gap-3 items-center">
          <Checkbox :default-value="false" /><ItemContent>Avatar Picker</ItemContent>
        </div>
      </div>
      <div>
        <div class="text-lg font-bold">
          V0.9 <span class="font-normal text-sm text-gray-400">Hello World</span>
        </div>
        <div class="flex gap-3 items-center">
          <Checkbox :default-value="true" /><ItemContent>Polish</ItemContent>
        </div>
        <div class="flex gap-3 items-center">
          <Checkbox :default-value="true" /><ItemContent>Domain</ItemContent>
        </div>
        <div class="flex gap-3 items-center">
          <Checkbox :default-value="true" /><ItemContent>Build</ItemContent>
        </div>
        <div class="flex gap-3 items-center">
          <Checkbox :default-value="true" /><ItemContent>Host</ItemContent>
        </div>
      </div>

      <div>
        <div class="text-lg font-bold">
          V1.0 <span class="font-normal text-sm text-gray-400">Finish</span>
        </div>
        <div class="flex gap-3 items-center">
          <Checkbox :default-value="true" /><ItemContent>Ask for feedback</ItemContent>
        </div>
        <div class="flex gap-3 items-center">
          <Checkbox :default-value="false" /><ItemContent>Bug fix</ItemContent>
        </div>
        <div class="flex gap-3 items-center">
          <Checkbox :default-value="false" /><ItemContent>???</ItemContent>
        </div>
        <div class="flex gap-3 items-center">
          <Checkbox :default-value="false" /><ItemContent>Profit</ItemContent>
        </div>
      </div>
    </div>
  </Item>
</template>
