import { defineStore } from 'pinia'
import { loginAccount, getUserInfoByID, getMenuTreeByRoleId } from '@/service/modules/login/login'
import { localCache } from '@/utils/cache'
import { TOKEN, USER_INFO, USER_MENUS, PERMISSIONS } from '@/global/constants'
import { mapMenuListToPermissions } from '@/utils/map-menus'
import type { IAccount } from '@/types'
import type { ILoginState } from './type'

const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: localCache.getCache(TOKEN) ?? '',
    userInfo: localCache.getCache(USER_INFO) ?? '',
    userMenus: localCache.getCache(USER_MENUS) ?? '',
    permissions: localCache.getCache(PERMISSIONS) ?? ''
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      const { code, msg, data } = await loginAccount(account)

      if (data) {
        const { id, token } = data
        this.token = token
        localCache.setCache(TOKEN, token)

        const userInfoRes = await getUserInfoByID(id)
        this.userInfo = userInfoRes.data
        localCache.setCache(USER_INFO, this.userInfo)

        const userMenusRes = await getMenuTreeByRoleId(this.userInfo.role.id)
        this.userMenus = userMenusRes.data
        localCache.setCache(USER_MENUS, this.userMenus)

        this.permissions = mapMenuListToPermissions(this.userMenus)
        localCache.setCache(PERMISSIONS, this.permissions)
      }

      return { code, msg }
    }
  }
})

export default useLoginStore
