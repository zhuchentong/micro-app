import { useStore } from '@/store'
import type { Router } from 'vue-router'
import { setupMicroApps } from './setup-micro-apps'
import { updateServices } from './update-services'

export default function (router: Router) {
  const store = useStore()
  router.beforeEach(async (to, from, next) => {
    if (!store.app.ready) {
      // 更新服务列表
      updateServices()
      // 安装微服务
      setupMicroApps()
      // 准备完毕
      store.app.setReady()
    }

    next()
  })
}
