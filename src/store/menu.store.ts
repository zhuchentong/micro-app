import { defineStore } from 'pinia'

type State = {
  // 侧边菜单状态
  collapsed: boolean
  // 菜单列表
  menus: MenuItem[]
}

const initialState: State = {
  collapsed: false,
  menus: [],
}

export const useMenuStore = defineStore('menu', {
  state: () => initialState,
  actions: {
    updateMenus(value: MenuItem[]) {
      this.menus = value
    },
  },
})
