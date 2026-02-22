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

import HabitBox from '@/components/Boxes/HabitBox.vue'
import AddHabitBox from './components/Boxes/AddBox.vue'
import TimerBox from './components/Boxes/TimerBox.vue'
import TodoBox from './components/Boxes/TodoBox.vue'
import DateBox from './components/Boxes/DateBox.vue'
import RoadMap from './components/Boxes/RoadMap.vue'
import JournalBox from './components/Boxes/JournalBox.vue'

import type { BoxItem } from './types'
import { createSwapy, utils, type Swapy, type SlotItemMapArray } from 'swapy'

import {
  onMounted,
  onUnmounted,
  ref,
  computed,
  watch,
  markRaw,
  nextTick,
  type Raw,
  type Component,
} from 'vue'

const BOX_COMPONENTS: Record<string, Raw<Component>> = {
  habit: markRaw(HabitBox),
  timer: markRaw(TimerBox),
  todo: markRaw(TodoBox),
  date: markRaw(DateBox),
  roadmap: markRaw(RoadMap),
  journal: markRaw(JournalBox),
}

interface SerializedBoxItem {
  boxId: string
  boxType: string
  rowSpan: number
}

function serializeBoxes(boxes: BoxItem[]): SerializedBoxItem[] {
  return boxes.map((b) => ({
    boxId: b.boxId,
    boxType: Object.entries(BOX_COMPONENTS).find(([, c]) => c === b.component)?.[0] || '',
    rowSpan: b.rowSpan,
  }))
}

function deserializeBoxes(serialized: SerializedBoxItem[]): BoxItem[] {
  return serialized
    .map((b) => {
      const comp = BOX_COMPONENTS[b.boxType]
      if (!comp) return null
      return { boxId: b.boxId, component: comp, rowSpan: b.rowSpan }
    })
    .filter((b): b is BoxItem => b !== null)
}

const STORAGE_KEY = 'dashboardBoxes'
const LAYOUT_KEY = 'dashboardLayout'

function loadBoxes(): BoxItem[] {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) {
    try {
      const serialized = JSON.parse(saved) as SerializedBoxItem[]
      return deserializeBoxes(serialized)
    } catch (e) {
      console.error('Failed to parse saved boxes', e)
    }
  }
  return [
    { boxId: 'date', component: markRaw(DateBox), rowSpan: 1 },
    { boxId: 'habit', component: markRaw(HabitBox), rowSpan: 1 },
    { boxId: 'timer', component: markRaw(TimerBox), rowSpan: 1 },
    { boxId: 'todo', component: markRaw(TodoBox), rowSpan: 1 },
    { boxId: 'todo2', component: markRaw(TodoBox), rowSpan: 1 },
    { boxId: 'roadmap', component: markRaw(RoadMap), rowSpan: 2 },
  ]
}

function saveBoxes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(serializeBoxes(activeBoxes.value)))
}

const activeBoxes = ref<BoxItem[]>(loadBoxes())

// Swapy
function addBox(component: Raw<Component>, boxId: string) {
  activeBoxes.value.push({ boxId, component, rowSpan: 1 })
  saveBoxes()
}

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
  const savedLayout = localStorage.getItem(LAYOUT_KEY)
  if (savedLayout) {
    try {
      const parsedLayout = JSON.parse(savedLayout) as { slot: string; item: string }[]
      const validLayout: { slot: string; item: string }[] = []
      const usedItems = new Set<string>()

      for (const entry of parsedLayout) {
        if (activeBoxes.value.some((b) => b.boxId === entry.item)) {
          validLayout.push(entry)
          usedItems.add(entry.item)
        }
      }

      for (const box of activeBoxes.value) {
        if (!usedItems.has(box.boxId)) {
          validLayout.push({ slot: box.boxId, item: box.boxId })
        }
      }

      slotItemMap.value = validLayout
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

      localStorage.setItem(LAYOUT_KEY, JSON.stringify(slotItemMap.value))
      saveBoxes()
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
            :class="item?.rowSpan === 2 ? 'row-span-2 min-h-[60vh]' : ''"
          >
            <div v-if="item" class="item h-full" :data-swapy-item="itemId" :key="itemId">
              <component :is="item.component" :storageId="itemId" />
            </div>
          </div>
        </div>
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>

<style scoped></style>
