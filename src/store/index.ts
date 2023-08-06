import { createPinia } from 'pinia'
import { mapMenusToRoutes } from '@/utils/map-menus'
import { isLogin } from '@/utils/islogin'
import useLoginStore from './login'
import useMainStore from './main'
import router from '@/router/index'
import type { App } from 'vue'

const pinia = createPinia()

function registerStore(app: App) {
  app.use(pinia)

  const loginStore = useLoginStore()
  const mainStore = useMainStore()

  if (isLogin()) {
    // 动态注册路由
    const routes = mapMenusToRoutes(loginStore.userMenus)
    routes.forEach((route) => router.addRoute('main', route))

    // 请求全局数据
    mainStore.fetchEntireDataAction()
  }
}

export default registerStore
