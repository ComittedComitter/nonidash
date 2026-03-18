<script setup lang="ts">
import {
  ChevronsUpDown,
  LogOut,
  Moon,
  ListTodoIcon,
  Eraser,
  Wrench,
} from 'lucide-vue-next'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { Switch } from '@/components/ui/switch'
import { useThemeStore } from '@/stores/theme'
import { useLocalStorage } from '@vueuse/core'
import { computed, ref, watch } from 'vue'

const props = defineProps<{
  user: {
    name: string
    email: string
    avatar: string
  }
}>()

const { isMobile } = useSidebar()
const themeStore = useThemeStore()

const menuOpen = ref(false)
const profileDialogOpen = ref(false)
const userColor = useLocalStorage('user-color', '#5fd0a6')
const userInitials = useLocalStorage('user-initials', '')
const sortCompleted = useLocalStorage<boolean>('todo-sort-completed', false)
const removeDoneYesterday = useLocalStorage<boolean>('todo-remove-done-yesterday', false)
const profileColors = ['#e879f9', '#22d3ee', '#facc15', '#5fd0a6', '#c10007', '#f97316']
const initialsDraft = ref('')
const colorDraft = ref(userColor.value)

function sanitizeInitials(value: string): string {
  return value.replace(/[^a-z]/gi, '').slice(0, 3).toUpperCase()
}

const fallbackInitials = computed(() => {
  const savedInitials = sanitizeInitials(userInitials.value)
  if (savedInitials) return savedInitials

  return props.user.name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0] ?? '')
    .join('')
    .slice(0, 3)
    .toUpperCase()
})

const initialsInput = computed({
  get: () => initialsDraft.value,
  set: (value: string | number) => {
    initialsDraft.value = sanitizeInitials(String(value))
  },
})

function openProfileDialog() {
  initialsDraft.value = fallbackInitials.value
  colorDraft.value = userColor.value
  menuOpen.value = false
  profileDialogOpen.value = true
}

function saveProfileAccent() {
  userInitials.value = sanitizeInitials(initialsDraft.value)
  userColor.value = colorDraft.value
  profileDialogOpen.value = false
}

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
      <Dialog v-model:open="profileDialogOpen">
        <DropdownMenu v-model:open="menuOpen">
        <DropdownMenuTrigger as-child>
          <SidebarMenuButton
            size="lg"
            class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <Avatar class="h-8 w-8 rounded-lg">
              <AvatarImage :src="user.avatar" :alt="user.name" />
              <AvatarFallback class="rounded-lg text-user"> {{ fallbackInitials }} </AvatarFallback>
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
            <button
              type="button"
              class="flex w-full items-center gap-2 rounded-md px-1 py-1.5 text-left text-sm transition-colors hover:bg-accent"
              @click="openProfileDialog"
            >
              <Avatar class="h-8 w-8 rounded-lg">
                <AvatarImage :src="user.avatar" :alt="user.name" />
                <AvatarFallback class="rounded-lg text-user"> {{ fallbackInitials }} </AvatarFallback>
              </Avatar>
              <div class="grid flex-1 text-left text-sm leading-tight">
                <span class="truncate font-semibold">{{ user.name }}</span>
                <span class="truncate text-xs">{{ user.email }}</span>
              </div>
              <Wrench class="size-4 text-muted-foreground mr-3" />
            </button>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem class="gap-2" @select.prevent>
              <Moon />
              <span>Dark Mode</span>
              <Switch
                :model-value="themeStore.isDark"
                class="ml-auto"
                @update:model-value="themeStore.setTheme(Boolean($event))"
              />
            </DropdownMenuItem>
            <DropdownMenuItem class="gap-2" @select.prevent>
              <ListTodoIcon/>
              <span>Sort Completed Tasks</span>
              <Switch
                :model-value="sortCompleted"
                class="ml-auto"
                @update:model-value="sortCompleted = Boolean($event)"
              />
            </DropdownMenuItem>
            <DropdownMenuItem class="gap-2" @select.prevent>
              <Eraser />
              <span>Remove Old Completed Tasks</span>
              <Switch
                :model-value="removeDoneYesterday"
                class="ml-auto"
                @update:model-value="removeDoneYesterday = Boolean($event)"
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

        <DialogContent class="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Customize Profile</DialogTitle>
            <DialogDescription>
              Pick up to three letters for your avatar and choose your accent color.
            </DialogDescription>
          </DialogHeader>

          <div class="grid gap-5 py-2">
            <div class="flex items-center gap-4 rounded-lg border p-4">
              <Avatar class="h-12 w-12 rounded-lg">
                <AvatarImage :src="user.avatar" :alt="user.name" />
                <AvatarFallback class="rounded-lg text-user" :style="{ color: colorDraft }">
                  {{ sanitizeInitials(initialsDraft) || fallbackInitials }}
                </AvatarFallback>
              </Avatar>
              <div class="grid gap-1">
                <span class="text-sm font-medium">{{ user.name }}</span>
                <span class="text-xs text-muted-foreground">{{ user.email }}</span>
              </div>
            </div>

            <div class="grid gap-2">
              <label for="profile-initials" class="text-sm font-medium">Avatar Letters</label>
              <Input
                id="profile-initials"
                v-model="initialsInput"
                maxlength="3"
                placeholder="ABC"
                class="uppercase"
              />
              <p class="text-xs text-muted-foreground">Use up to 3 letters.</p>
            </div>

            <div class="grid gap-2">
              <span class="text-sm font-medium">Accent Color</span>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="color in profileColors"
                  :key="color"
                  type="button"
                  class="h-8 w-8 rounded-full border-2 transition-transform hover:scale-105"
                  :style="{ backgroundColor: color }"
                  :class="colorDraft === color ? 'border-foreground' : 'border-transparent'"
                  @click="colorDraft = color"
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" @click="profileDialogOpen = false">Cancel</Button>
            <Button @click="saveProfileAccent">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SidebarMenuItem>
  </SidebarMenu>
</template>
