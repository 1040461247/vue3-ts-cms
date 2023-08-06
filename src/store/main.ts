import { defineStore } from 'pinia'
import { getEntireRoleList, getEntireDepartmentList, getEntireMenuList } from '@/service/modules/index'

interface IState {
  entireRoles: any[]
  entireDepartments: any[]
  entireMenus: any[]
}

const useMainStore = defineStore('main', {
  state: (): IState => ({
    entireRoles: [],
    entireDepartments: [],
    entireMenus: []
  }),
  actions: {
    async fetchEntireDataAction() {
      const roleProm = getEntireRoleList()
      const departProm = getEntireDepartmentList()
      const menuProm = getEntireMenuList()
      const [roleRes, departRes, menuRes] = await Promise.all([roleProm, departProm, menuProm])
      this.entireRoles = roleRes.data.list
      this.entireDepartments = departRes.data.list
      this.entireMenus = menuRes.data.list
    }
  }
})

export default useMainStore
