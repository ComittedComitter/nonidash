<script setup lang="ts">
import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  LogOut,
  Sparkles,
  Moon,
  Sun,
  Palette,
  ListTodoIcon,
  Eraser,
} from 'lucide-vue-next'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { Switch } from '@/components/ui/switch'
import { useThemeStore } from '@/stores/theme'
import { useLocalStorage } from '@vueuse/core'
import { computed, watch } from 'vue'

defineProps<{
  user: {
    name: string
    email: string
    avatar: string
  }
}>()

const { isMobile } = useSidebar()
const themeStore = useThemeStore()

const userColor = useLocalStorage('user-color', '#5fd0a6')
const sortCompleted = useLocalStorage<boolean>('todo-sort-completed', true)
const removeDoneYesterday = useLocalStorage<boolean>('todo-remove-done-yesterday', false)
const sortCompletedChecked = computed({
  get: () => Boolean(sortCompleted.value),
  set: (value: boolean) => {
    sortCompleted.value = value
  },
})
const removeDoneYesterdayChecked = computed({
  get: () => Boolean(removeDoneYesterday.value),
  set: (value: boolean) => {
    removeDoneYesterday.value = value
  },
})
const colorOptions = ['#e879f9', '#22d3ee', '#facc15']
const premiumColorOptions = ['#5fd0a6', '#c10007']

watch(
  userColor,
  (newColor) => {
    document.documentElement.style.setProperty('--user-color', newColor)
  },
  { immediate: true },
)
</script>

<template>
  <SidebarMenu>
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <SidebarMenuButton
            size="lg"
            class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <Avatar class="h-8 w-8 rounded-lg">
              <AvatarImage :src="user.avatar" :alt="user.name" />
              <AvatarFallback class="rounded-lg text-user"> MO </AvatarFallback>
            </Avatar>
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-medium">{{ user.name }}</span>
              <span class="truncate text-xs">{{ user.email }}</span>
            </div>
            <ChevronsUpDown class="ml-auto size-4" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          class="w-[--reka-dropdown-menu-trigger-width] min-w-56 rounded-lg"
          :side="isMobile ? 'bottom' : 'right'"
          align="end"
          :side-offset="4"
        >
          <DropdownMenuLabel class="p-0 font-normal">
            <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar class="h-8 w-8 rounded-lg">
                <AvatarImage :src="user.avatar" :alt="user.name" />
                <AvatarFallback class="rounded-lg"> CN </AvatarFallback>
              </Avatar>
              <div class="grid flex-1 text-left text-sm leading-tight">
                <span class="truncate font-semibold">{{ user.name }}</span>
                <span class="truncate text-xs">{{ user.email }}</span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Sparkles />
              Upgrade to Pro
              <div class="ml-auto flex gap-1.5">
                <button
                  v-for="color in premiumColorOptions"
                  :key="color"
                  @click.stop="userColor = color"
                  class="h-4 w-4 rounded-full border-2 transition-transform hover:scale-110"
                  :style="{ backgroundColor: color }"
                  :class="userColor === color ? 'border-foreground' : 'border-transparent'"
                />
              </div>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem @click="themeStore.toggle()">
              <component :is="themeStore.isDark ? Sun : Moon" />
              {{ themeStore.isDark ? 'Light Mode' : 'Dark Mode' }}
            </DropdownMenuItem>
            <DropdownMenuItem class="cursor-pointer gap-2">
              <Palette />
              <span>Accent Color</span>
              <div class="ml-auto flex gap-1.5">
                <button
                  v-for="color in colorOptions"
                  :key="color"
                  @click.stop="userColor = color"
                  class="h-4 w-4 rounded-full border-2 transition-transform hover:scale-110"
                  :style="{ backgroundColor: color }"
                  :class="userColor === color ? 'border-foreground' : 'border-transparent'"
                />
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <BadgeCheck />
              Account
            </DropdownMenuItem>
            <DropdownMenuItem class="gap-2" @select.prevent>
              <ListTodoIcon/>
              <span>Sort Completed Tasks</span>
              <Switch
                :checked="sortCompletedChecked"
                class="ml-auto"
                @click.stop="sortCompletedChecked = !sortCompletedChecked"
              />
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Eraser />
              <span>Remove Old Completed Tasks</span>
              <Switch
                :checked="removeDoneYesterdayChecked"
                class="ml-auto"
                @click.stop="removeDoneYesterdayChecked = !removeDoneYesterdayChecked"
              />
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogOut />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  </SidebarMenu>
</template>
