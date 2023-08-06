import { localCache } from '@/utils/cache'
import { PERMISSIONS } from '@/global/constants'

function isPermission(permissionId: string) {
  const permissions = localCache.getCache(PERMISSIONS)
  return permissions.includes(permissionId)
}

export default isPermission
