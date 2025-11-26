<script setup lang="ts">
import AppSidebar from '@/components/AppSidebar.vue'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

import HabitBox from '@/components/HabitBoxes/HabitBox.vue'
import AddHabitBox from './components/HabitBoxes/AddBox.vue'
import TimerBox from './components/HabitBoxes/TimerBox.vue'
import TodoBox from './components/HabitBoxes/TodoBox.vue'
import DateBox from './components/HabitBoxes/DateBox.vue'

import { onMounted, onUnmounted, ref } from 'vue'
import { createSwapy, type Swapy } from 'swapy'

const swapy = ref<Swapy | null>(null)
const container = ref<HTMLElement | null>()

onMounted(() => {
  // If container element is loaded
  if (container.value) {
    swapy.value = createSwapy(container.value)

    swapy.value.onBeforeSwap((event) => {
      console.log('beforeSwap', event)
      // This is for dynamically enabling and disabling swapping.
      // Return true to allow swapping, and return false to prevent swapping.
      return true
    })
  }
})

onUnmounted(() => {
  // Destroy the swapy instance on component destroy
  swapy.value?.destroy()
})
</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <header
        class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12"
      >
        <div class="flex items-center gap-2 px-4">
          <SidebarTrigger class="-ml-1" />
          <Separator orientation="vertical" class="mr-2 data-[orientation=vertical]:h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem class="hidden md:block">
                <BreadcrumbLink href="#"> Dashboard </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div
          class="container grid auto-rows-min gap-4 md:grid-cols-2 lg:grid-cols-3"
          ref="container"
        >
          <div data-swapy-slot="row1-col1">
            <div data-swapy-item="date"><DateBox /></div>
          </div>
          <div data-swapy-slot="row1-col2">
            <div data-swapy-item="habit"><HabitBox /></div>
          </div>
          <div data-swapy-slot="row1-col3">
            <div data-swapy-item="habit2"><HabitBox /></div>
          </div>
          <div data-swapy-slot="row2-col1">
            <div data-swapy-item="timer"><TimerBox /></div>
          </div>
          <div data-swapy-slot="row2-col2">
            <div data-swapy-item="todo"><TodoBox /></div>
          </div>
          <div data-swapy-slot="row2-col3">
            <div data-swapy-item="add"><AddHabitBox /></div>
          </div>
          <!--  <div data-swapy-slot="row3-col1">
            <div data-swapy-item="empty"><div class="bg-muted/50 aspect-video rounded-xl" /></div>
          </div>
          <div data-swapy-slot="row3-col2">
            <div data-swapy-item="empty2"><div class="bg-muted/50 aspect-video rounded-xl" /></div>
          </div> -->
        </div>
        <div class="bg-muted/50 min-h-[100h] flex-1 rounded-xl md:min-h-min" />
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>

<style scoped></style>
