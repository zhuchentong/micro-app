import App from './App.vue'
import createRouter from './router'
import { createApp } from 'vue'
import '@unocss/reset/tailwind.css'
import 'uno.css'
import './styles/index.scss'
import type { App as VueInstance } from 'vue'
import { bootstrap } from './bootstrap'

/**
 * 启动项目
 */
async function setupApp() {
  const router = createRouter()
  // 创建APP
  const app = createApp(App).use(router)
  // 系统初始化
  await bootstrap(app, router)
  await router.isReady()
  // 挂在应用
  app.mount('#app')

  return app
}

if (window.__POWERED_BY_WUJIE__) {
  let instance: VueInstance<Element>

  window.__WUJIE_MOUNT = async () => {
    instance = await setupApp()
  }
  window.__WUJIE_UNMOUNT = () => {
    instance.unmount()
  }
  /*
    由于vite是异步加载，而无界可能采用fiber执行机制
    所以mount的调用时机无法确认，框架调用时可能vite
    还没有加载回来，这里采用主动调用防止用没有mount
    无界mount函数内置标记，不用担心重复mount
  */
  window.__WUJIE.mount()
} else {
  setupApp()
}
