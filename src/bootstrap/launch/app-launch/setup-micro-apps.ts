import { useStore } from '@/store'
import wujie from 'wujie-vue3'
const { setupApp, preloadApp } = wujie

export const setupMicroApps = () => {
  const store = useStore()

  // setup app
  store.app.services.forEach(({ app }) => {
    setupApp({
      name: app.name,
      url: app.url,
      exec: true,
    })
  })

  // preload app
  store.app.services.forEach(({ app }) => {
    preloadApp({
      name: app.name,
      url: app.url,
    })
  })
}
