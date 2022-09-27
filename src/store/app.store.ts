import { defineStore } from 'pinia'

type State = {
  ready: boolean
  loading: boolean
  services: AppServiceConfig[]
}

const initialState: State = {
  ready: false,
  loading: false,
  services: [],
}

export const useAppStore = defineStore('app', {
  state: () => initialState,
  actions: {
    setReady() {
      this.ready = true
    },
    updateLoading(loading: boolean) {
      this.loading = loading
    },
    updateServices(services: AppServiceConfig[]) {
      this.services = services
    },
  },
  persist: {
    paths: ['services'],
  },
})
