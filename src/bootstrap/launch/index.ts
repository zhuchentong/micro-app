import type { Router } from 'vue-router'
import appLaunch from './app-launch'
import userLaunch from './user-launch'

export default function (router: Router) {
  appLaunch(router)
  userLaunch(router)
}
