import hyRequest from '../../../index'
import type { IPostUserListOptions } from '@/store/type'

// 用户管理请求
export async function postUserList(options: IPostUserListOptions) {
  return await hyRequest.post({
    url: '/users/list',
    data: options
  })
}

export async function deleteUserById(id: number) {
  return await hyRequest.delete({
    url: `/users/${id}`
  })
}

export async function createUser(userInfo: any) {
  return await hyRequest.post({
    url: `/users`,
    data: userInfo
  })
}

export async function updateUserById(userInfo: any, id: number) {
  return await hyRequest.patch({
    url: `/users/${id}`,
    data: userInfo
  })
}

// 通用接口
export async function postPageList(pageName: string, postData: any) {
  return await hyRequest.post({
    url: `/${pageName}/list`,
    data: postData
  })
}

export async function deletePageById(pageName: string, id: number) {
  return await hyRequest.delete({
    url: `/${pageName}/${id}`
  })
}

export async function createPage(pageName: string, pageInfo: any) {
  return await hyRequest.post({
    url: `/${pageName}`,
    data: pageInfo
  })
}

export async function updatePageById(pageName: string, pageInfo: any, id: number) {
  return await hyRequest.patch({
    url: `/${pageName}/${id}`,
    data: pageInfo
  })
}
