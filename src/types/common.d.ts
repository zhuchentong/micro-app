export {}

declare global {
  type MenuItem = {
    title: string
    path?: string
    icon?: string
    app: string
    children?: MenuItem[]
  }

  type AppService = {
    name: string
    url: string
    title: string
  }

  type AppMenu = {
    title: string
    path: string
    icon?: string
  }

  type AppServiceConfig = {
    app: AppService
    menus: AppMenu[]
  }
}
