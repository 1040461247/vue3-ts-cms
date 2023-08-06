import { localCache } from './cache'
import { TOKEN, USER_INFO, USER_MENUS } from '@/global/constants'

export function isLogin() {
  const {
    [TOKEN]: token,
    [USER_INFO]: userInfo,
    [USER_MENUS]: userMenus
  } = localCache.getCache([TOKEN, USER_INFO, USER_MENUS])

  if (token && userInfo && userMenus) {
    return true
  }

  return false
}
