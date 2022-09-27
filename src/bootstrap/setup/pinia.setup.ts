import { createPinia } from 'pinia'
import type { App } from 'vue'

import persist from 'pinia-plugin-persistedstate'

export default function (app: App<Element>) {
  const pinia = createPinia()

  pinia.use(persist)

  app.use(pinia)
}
