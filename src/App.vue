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
import RoadMap from './components/HabitBoxes/RoadMap.vue'

const activeBoxes = ref([
  { boxId: 'date', component: markRaw(DateBox), rowSpan: 1 },
  { boxId: 'habit', component: markRaw(HabitBox), rowSpan: 1 },
  { boxId: 'timer', component: markRaw(TimerBox), rowSpan: 1 },
  { boxId: 'todo', component: markRaw(TodoBox), rowSpan: 1 },
  { boxId: 'todo2', component: markRaw(TodoBox), rowSpan: 1 },
  { boxId: 'roadmap', component: markRaw(RoadMap), rowSpan: 2 },
])

function addBox(component: ReturnType<typeof markRaw>, boxId: string) {
  activeBoxes.value.push({ boxId, component, rowSpan: 1 })
}

// Swapy
import { onMounted, onUnmounted, ref, computed, watch, markRaw, nextTick, type Ref } from 'vue'
import { createSwapy, utils, type Swapy, type SlotItemMapArray } from 'swapy'

const slotItemMap = ref(utils.initSlotItemMap(activeBoxes.value, 'boxId'))
const slottedItems = computed(() =>
  utils.toSlottedItems(activeBoxes.value, 'boxId', slotItemMap.value),
)

const swapy = ref<Swapy | null>(null)
const container = ref<HTMLElement | null>()

watch(
  activeBoxes,
  () =>
    utils.dynamicSwapy(
      swapy.value,
      activeBoxes.value,
      'boxId',
      slotItemMap.value,
      (value: SlotItemMapArray) => (slotItemMap.value = value),
    ),
  { deep: true },
)

onMounted(async () => {
  // load data
  const savedLayout = localStorage.getItem('dashboardLayout')
  if (savedLayout) {
    try {
      slotItemMap.value = JSON.parse(savedLayout)
    } catch (e) {
      console.error('Failed to parse saved layout', e)
    }
  }
  await nextTick()
  if (!container.value) {
    throw new Error('Container not found')
  }

  swapy.value = createSwapy(container.value, {
    manualSwap: true,
  })

  swapy.value.onSwap(async (event) => {
    requestAnimationFrame(() => {
      slotItemMap.value = event.newSlotItemMap.asArray

      localStorage.setItem('dashboardLayout', JSON.stringify(slotItemMap.value))
    })
  })
})

onUnmounted(() => {
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
          <AddHabitBox @add="addBox" />
        </div>
      </header>
      <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div
          class="grid auto-rows-[30vh] grid-flow-dense gap-4 md:grid-cols-2 lg:grid-cols-3"
          ref="container"
          id="dashboard"
        >
          <div
            v-for="{ slotId, itemId, item } in slottedItems"
            :key="slotId"
            :data-swapy-slot="slotId"
            :class="item?.rowSpan === 2 ? 'row-span-2' : ''"
          >
            <div v-if="item" class="item" :data-swapy-item="itemId" :key="itemId">
              <component :is="item.component" :storageId="itemId" />
            </div>
          </div>
        </div>
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>

<style scoped></style>
