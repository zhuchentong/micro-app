import { createPinia } from 'pinia'
import type { App } from 'vue'

import persist from 'pinia-plugin-persistedstate'

/**
 * pinia安装
 * @param {App} app Vue APP
 */
export default function (app: App<Element>) {
  const pinia = createPinia()

  pinia.use(persist)

  app.use(pinia)
}
