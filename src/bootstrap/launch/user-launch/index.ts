import { useStore } from '@/store'
import type { Router } from 'vue-router'
import { updateMenus } from './update-menus'

export default function (router: Router) {
  const store = useStore()

  router.beforeEach(async (to, from, next) => {
    if (!store.user.current) {
      await updateMenus()
    }

    next()
  })
}
