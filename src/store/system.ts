import { defineStore } from 'pinia'
import {
  postUserList,
  deleteUserById,
  createUser,
  updateUserById,
  postPageList,
  deletePageById,
  createPage,
  updatePageById
} from '@/service/modules/index'
import type { ISystemState, IPostUserListOptions } from './type'

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    userList: [],
    userTotalCount: 0,
    pageList: [],
    pageTotalCount: 0
  }),
  actions: {
    async postUserListAction(options: IPostUserListOptions) {
      const { code, msg, data } = await postUserList(options)
      if (code !== 1) throw { code, msg }

      const { list, totalCount } = data
      this.userList = list
      this.userTotalCount = totalCount
    },
    async deleteUserByIdAction(id: number) {
      return await deleteUserById(id)
    },
    async createUserAction(userInfo: any) {
      const createRes = await createUser(userInfo)
      this.postUserListAction({ offset: 0, size: 10 })
      return createRes
    },
    async updateUserByIdAction(userInfo: any, id: number) {
      const updateRes = await updateUserById(userInfo, id)
      this.postUserListAction({ offset: 0, size: 10 })
      return updateRes
    },

    // 通用接口
    async postPageListAction(pageName: string, postData: any) {
      const { code, msg, data } = await postPageList(pageName, postData)
      if (code !== 1) throw { code, msg }

      const { list, totalCount } = data
      this.pageList = list
      this.pageTotalCount = totalCount
    },
    async deletePageByIdAction(pageName: string, id: number) {
      return await deletePageById(pageName, id)
    },
    async createPageAction(pageName: string, pageInfo: any) {
      const createRes = await createPage(pageName, pageInfo)
      this.postPageListAction(pageName, { offset: 0, size: 10 })
      return createRes
    },
    async updatePageByIdAction(pageName: string, userInfo: any, id: number) {
      const updateRes = await updatePageById(pageName, userInfo, id)
      this.postPageListAction(pageName, { offset: 0, size: 10 })
      return updateRes
    }
  }
})

export default useSystemStore
