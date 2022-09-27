import type { App } from 'vue'
import type { Router } from 'vue-router'

import launch from './launch'
import setup from './setup'

export const bootstrap = async (app: App<Element>, router: Router) => {
  // 安装配置逻辑
  await setup(app)
  // 安装启动逻辑
  await launch(router)
}
