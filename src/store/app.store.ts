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
    /**
     * 更新Loading状态
     * @param {boolean} loading 加载状态
     */
    updateLoading(loading: boolean): void {
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
