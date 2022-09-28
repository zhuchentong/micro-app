import generatedRoutes from '~pages'
import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
// 自定义路由
const routes: RouteRecordRaw[] = [
  // 根目录跳转
  { path: '/', redirect: '/page1' },
  ...setupLayouts(generatedRoutes),
]

export default () => {
  return createRouter({
    routes,
    history: createWebHistory(),
  })
}
