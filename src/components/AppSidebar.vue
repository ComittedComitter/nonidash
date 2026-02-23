<script setup lang="ts">
import type { SidebarProps } from '@/components/ui/sidebar'

import {
  AudioLines,
  AudioWaveform,
  BookOpen,
  Command,
  Film,
  GalleryVerticalEnd,
  Settings2,
  Shirt,
} from 'lucide-vue-next'
import NavMain from '@/components/NavMain.vue'
import NavProjects from '@/components/NavProjects.vue'
import NavUser from '@/components/NavUser.vue'
import XpBar from '@/components/ui/XpBar.vue'
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
          title: 'Introduction',
          url: '#',
        },
        {
          title: 'Get Started',
          url: '#',
        },
        {
          title: 'Tutorials',
          url: '#',
        },
        {
          title: 'Changelog',
          url: '#',
        },
      ],
    },
    {
      title: 'Settings',
      url: '#',
      icon: Settings2,
      items: [
        {
          title: 'General',
          url: '#',
        },
        {
          title: 'Team',
          url: '#',
        },
        {
          title: 'Billing',
          url: '#',
        },
        {
          title: 'Limits',
          url: '#',
        },
      ],
    },
  ],
  projects: [
    {
      name: 'Beat Platform',
      url: '#',
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
      <XpBar />
      <NavUser :user="data.user" />
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>
