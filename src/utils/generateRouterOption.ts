import type { RouteRecordRaw } from 'vue-router'
import { treeUtil } from '@mctech/biz-data-utils'
export interface MenuOption {
  name: string
  title: string
  path: string
  id: number
  iconClassName: string
  parentId: number
  icon?: string
}
export function getMenuOptions(routes: RouteRecordRaw[]): MenuOption[] {
  const menuOptions: MenuOption[] = []
  routes.forEach((route) => {
    const { name, path, meta: { parentId, hidden, icon, title } } = route
    if (!hidden) {
      menuOptions.push({
        title,
        iconClassName: 'fas fa-file',
        name,
        path,
        id: name,
        parentId,
        icon,
      })
    }
  })
  const { records } = treeUtil.initTree(menuOptions)
  console.log(records)
  return menuOptions
}
