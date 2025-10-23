import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Done from '@/views/Done.vue'
import NotDone from '@/views/NotDone.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/done',
      name: 'done',
      component: Done,
    },
    {
      path: '/notdone',
      name: 'notdone',
      component: NotDone,
    },
  ],
})

export default router
