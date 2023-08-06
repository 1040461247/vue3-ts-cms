import type { RouteRecordRaw } from 'vue-router'

function loadLocalRoutes() {
  const localRoutes = []
  const files: Record<string, any> = import.meta.glob('@/router/main/**/*.ts', { eager: true })
  for (const key in files) {
    localRoutes.push(files[key].default)
  }

  return localRoutes
}

export let defaultURL: string = ''
export function mapMenusToRoutes(userMenus: any[]) {
  const localRoutes = loadLocalRoutes()

  const routes: RouteRecordRaw[] = []
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      const route = localRoutes.find((item) => item.path === submenu.url)
      if (route) routes.push(route)
    }
  }

  defaultURL = routes[0].path

  return routes
}

export function mapPathToMenu(path: string, userMenus: any[]) {
  for (const menu of userMenus) {
    const targetMenu = menu.children.find((submenu: any) => submenu.url === path)
    if (targetMenu) return targetMenu
  }
}

interface IBreadcumb {
  name: string
  path: string
}
export function mapPathToBreadcrumbs(path: string, userMenus: any[]) {
  const breadcrumbsList: IBreadcumb[] = []

  for (const menu of userMenus) {
    const targetMenu = menu.children.find((submenu: any) => submenu.url === path)
    if (targetMenu) {
      breadcrumbsList.push({ name: menu.name, path: menu.children[0].url })
      breadcrumbsList.push({ name: targetMenu.name, path: targetMenu.url })
    }
  }

  return breadcrumbsList
}

export function mapMenuListToIds(menuList: any[]) {
  const ids: number[] = []

  function recurse(menuList: any[]) {
    for (const menu of menuList) {
      if (!menu.children) return ids.push(menu.id)
      recurse(menu.children)
    }
  }
  recurse(menuList)

  return ids
}

export function mapMenuListToPermissions(menuList: any[]) {
  const permisstions: string[] = []

  function recurse(menus: any[]) {
    for (const menu of menus) {
      if (!menu.children) {
        menu.permission && permisstions.push(menu.permission)
        continue
      }

      recurse(menu.children)
    }
  }
  recurse(menuList)

  return permisstions
}
