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
      component: () => import('../views/WikiSearchView.vue')
    },
    {
      path: '/wiki/page',
      name: 'wikiPage',
      component: () => import('../views/WikiView.vue')
    },
    {
      path: '/wiki/new',
      name: 'wikiNew',
      component: () => import('../views/WikiCreateView.vue')
    },
    {
      path: '/wiki/edit',
      name: 'wikiEdit',
      props: true,
      component: () => import('../views/WikiEditView.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignUpView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    }
  ]
})

export default router
