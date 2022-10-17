import type { AppConfig } from '../types/app.config'

export const appConfig: AppConfig = {
  app: 'app-1',
  title: '商城后台管理',
  logo: '/favicon.ico',
  http: {
    gateway: import.meta.env.VITE_HTTP_GATEWAY,
    timeout: 3000,
  },
  workspace: {
    headerFixed: true,
    sideFixed: true,
    contentWidth: 'auto',
    sideWidth: 200,
    sideCollapsedWidth: 60,
    sideMode: 'pop',
    headerHeight: 60,
  },
  theme: {
    style: 'auto',
  },
}
