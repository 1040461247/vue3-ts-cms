import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import { TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'
import { defaultURL } from '@/utils/map-menus'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: 'main'
    },
    {
      path: '/login',
      component: () => import('@/views/login/Login.vue'),
      name: 'login'
    },
    {
      path: '/main',
      component: () => import('@/views/main/Main.vue'),
      name: 'main'
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('@/views/not-found/NotFound.vue')
    }
  ]
})

router.beforeEach((to) => {
  const token = localCache.getCache(TOKEN)
  if (to.path.startsWith('/main') && !token) {
    return { name: 'login' }
  }

  if (to.path === '/main') {
    return defaultURL
  }
})

export default router
