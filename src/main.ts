import App from './App.vue'
import { router } from './router'
import { createApp } from 'vue'
import '@unocss/reset/tailwind.css'
import 'uno.css'
import './styles/index.scss'

import { bootstrap } from './bootstrap'

/**
 * 启动项目
 */
async function setupApp() {
  // 创建APP
  const app = createApp(App).use(router)
  // 系统初始化
  await bootstrap(app, router)
  // 挂在应用
  app.mount('#app')
}

setupApp()
