import { defineStore } from 'pinia'

type State = {
  ready: boolean
  loading: boolean
  gateway: string
}

const initialState: State = {
  ready: false,
  loading: false,
  gateway: '',
}

export const useAppStore = defineStore('app', {
  state: () => initialState,
  actions: {
    /**
     * 更新准备状态
     */
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
    /**
     * 更新Gateway
     * @param {string} gateway 网关地址
     */
    updateGateway(gateway: string) {
      this.gateway = gateway
    },
  },
  persist: {
    paths: ['services'],
  },
})
