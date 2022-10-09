import { defineStore } from 'pinia'

type State = {
  current?: any
  token?: string
}

const initialState: State = {
  current: undefined,
  token: undefined,
}

export const useUserStore = defineStore('user', {
  state: () => initialState,
})
