import { defineStore } from 'pinia'

type State = {
  current?: any
  token?: string
}

const initialState: State = {
  current: undefined,
  token: undefined,
}

export const useUserStore = defineStore('app', {
  state: () => initialState,
  actions: {
    updateCurrent(user: any) {
      this.current = user
    },
    updateToken(token: string) {
      this.token = token
    },
  },
})
