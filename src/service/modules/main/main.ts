import hyRequest from '../../index'

export async function getEntireRoleList() {
  return await hyRequest.post({
    url: '/role/list'
  })
}

export async function getEntireDepartmentList() {
  return await hyRequest.post({
    url: '/department/list'
  })
}

export async function getEntireMenuList() {
  return await hyRequest.post({
    url: '/menu/list'
  })
}
