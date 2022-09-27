export const app: AppService = {
  name: 'app-1',
  url: import.meta.env.VITE_APP_TEST1_URL,
  title: 'app-1',
}
export const menus: AppMenu[] = [
  {
    title: 'page1',
    path: '/page1',
  },
  {
    title: 'page2',
    path: '/page2',
  },
]
