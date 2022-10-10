import type { Router } from 'vue-router'
import appLaunch from './app-launch'
import userLaunch from './user-launch'

/**
 * 启动逻辑
 * @param {Router} router 应用路由
 */
export default function (router: Router) {
  appLaunch(router)
  userLaunch(router)
}
