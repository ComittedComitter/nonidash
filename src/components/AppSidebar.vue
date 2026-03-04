<script setup lang="ts">
import type { SidebarProps } from '@/components/ui/sidebar'

import {
  AudioLines,
  AudioWaveform,
  BookOpen,
  Command,
  Film,
  GalleryVerticalEnd,
  Shirt,
} from 'lucide-vue-next'
import NavMain from '@/components/NavMain.vue'
import NavProjects from '@/components/NavProjects.vue'
import NavUser from '@/components/NavUser.vue'
import XpBar from '@/components/ui/XpBar.vue'
import DailyReward from '@/components/ui/DailyReward.vue'
import TeamSwitcher from '@/components/TeamSwitcher.vue'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'

const props = withDefaults(defineProps<SidebarProps>(), {
  collapsible: 'icon',
})

// This is sample data.
const data = {
  user: {
    name: 'Mo',
    email: 'momo@nonidash.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Studio Boys',
      logo: GalleryVerticalEnd,
      plan: 'Startup',
    },
    {
      name: 'Break-Even',
      logo: AudioWaveform,
      plan: 'Enterprise',
    },
    {
      name: 'Personal',
      logo: Command,
      plan: 'Free',
    },
  ],
  navMain: [
    {
      title: 'Documentation',
      url: '#',
      icon: BookOpen,
      items: [
        {
          title: 'Roadmap',
          url: '/roadmap',
        },
      ],
    },
  ],
  projects: [
    {
      name: 'Dashboard',
      url: '/',
      icon: AudioLines,
    },
    {
      name: 'Music Videos',
      url: '#',
      icon: Film,
    },
    {
      name: 'Artist Branding',
      url: '#',
      icon: Shirt,
    },
  ],
}
</script>

<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <TeamSwitcher :teams="data.teams" />
    </SidebarHeader>
    <SidebarContent>
      <NavProjects :projects="data.projects" />
      <NavMain :items="data.navMain" />
    </SidebarContent>
    <SidebarFooter>
      <div
        class="transition-all duration-200 ease-linear group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:overflow-hidden"
      >
        <DailyReward />
        <XpBar />
      </div>
      <NavUser :user="data.user" />
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>
