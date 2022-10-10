import { useStore } from '@/store'
import type { Router } from 'vue-router'

/**
 * 用户启动逻辑
 * @param  {Router} router 应用路由
 */
export default function (router: Router) {
  const store = useStore()

  router.beforeEach(async (to, from, next) => {
    if (!store.user.current) {
      store.user.$state = $wujie.props?.user
    }

    next()
  })
}
