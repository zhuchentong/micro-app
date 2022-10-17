import { useStore } from '@/store'
import type { Router } from 'vue-router'

/**
 * 应用启动逻辑
 * @param {Router} router 应用路由
 */
export default function (router: Router) {
  const store = useStore()
  router.beforeEach(async (to, from, next) => {
    if (!store.app.ready) {
      // 更新网关地址
      store.app.updateGateway($wujie.props?.gateway)
      // 准备完毕
      store.app.setReady()
    }

    next()
  })
}
