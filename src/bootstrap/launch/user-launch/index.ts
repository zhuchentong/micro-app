import { useStore } from '@/store'
import type { Router } from 'vue-router'

export default function (router: Router) {
  const store = useStore()

  router.beforeEach(async (to, from, next) => {
    if (!store.user.current) {
      store.user.$state = $wujie.props?.user
    }

    next()
  })
}
