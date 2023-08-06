import hyRequest from '../../index'
import type { IAccount } from '@/types'

export async function loginAccount(account: IAccount) {
  const res = await hyRequest.post({
    url: '/login',
    data: account
  })

  return res
}

export async function getUserInfoByID(id: number) {
  return await hyRequest.get({
    url: `/users/${id}`
  })
}

export async function getMenuTreeByRoleId(id: number) {
  return await hyRequest.get({
    url: `/role/${id}/menu`
  })
}
