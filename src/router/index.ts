import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/markdown',
      name: 'markdown',
      component: () => import('../views/MarkView.vue')
    },
    {
      path: '/wiki',
      name: 'wiki',
      component: () => import('../views/WikiView.vue')
    },
    {
      path: '/wiki/new',
      name: 'wikiNew',
      component: () => import('../views/WikiCreateView.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignUpView.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/WikiSearchView.vue')
    }
  ]
})

export default router
