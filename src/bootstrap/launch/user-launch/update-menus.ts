import { useStore } from '@/store'

export const updateMenus = () => {
  const store = useStore()

  const menus: MenuItem[] = store.app.services.map(({ app, menus }) => {
    //TODO: 权限处理
    return {
      app: app.name,
      title: app.title,
      children: menus.map((menu) => ({
        ...menu,
        app: app.name,
      })),
    }
  })

  store.menu.updateMenus(menus)
}
