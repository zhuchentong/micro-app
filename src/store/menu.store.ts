import { defineStore } from 'pinia'

const STORE_ID = 'menu'

type State = {
  // 侧边菜单展开状态
  collapsed: boolean
  // 顶部菜单列表
  menus: number[]
  a: number[]
}

const initialState: State = {
  collapsed: false,
  menus: [],
  a: [1, 2, 3],
}

export const store = defineStore(STORE_ID, {
  state: () => initialState,
  actions: {},
})
