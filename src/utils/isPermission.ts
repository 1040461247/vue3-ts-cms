import { localCache } from '@/utils/cache'
import { PERMISSIONS } from '@/global/constants'

function isPermission(permissionId: string) {
  const permissions = localCache.getCache(PERMISSIONS)
  const findRes = permissions.find((item) => {
    return item.includes(permissionId)
  })

  return !!findRes
}

export default isPermission
