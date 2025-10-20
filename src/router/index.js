import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Done from '@/views/Done.vue'
const router = createRouter({
  history: createWebHistory(),
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
  ],
})

export default router
