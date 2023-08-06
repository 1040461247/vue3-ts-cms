export interface ILoginState {
  token: string
  userInfo: any
  userMenus: any
  permissions: string[]
}

export interface ISystemState {
  userList: any[]
  userTotalCount: number
  pageList: any[]
  pageTotalCount: number
}

export interface IPostUserListOptions {
  offset: number
  size: number
  name?: string
  realname?: string
  cellphone?: string
  enable?: number
  createAt?: string
}
