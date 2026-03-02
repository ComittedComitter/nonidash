import { createRouter, createWebHistory } from 'vue-router'
import DashboardPage from '@/pages/DashboardPage.vue'
import RoadmapPage from '@/pages/RoadmapPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardPage,
    },
    {
      path: '/roadmap',
      name: 'roadmap',
      component: RoadmapPage,
    },
  ],
})

export default router
