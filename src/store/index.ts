import { defineStore } from 'pinia'
import { useAppStore } from './app.store'
import { useMenuStore } from './menu.store'
import { useUserStore } from './user.store'

export const useStore = defineStore('main', {
  getters: {
    app: () => useAppStore(),
    menu: () => useMenuStore(),
    user: () => useUserStore(),
  },
})
