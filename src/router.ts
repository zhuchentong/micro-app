import generatedRoutes from '~pages'
import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Login from './views/login/index.vue'

// 自定义路由
const routes: RouteRecordRaw[] = [
  // 根目录跳转
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  ...setupLayouts(generatedRoutes),
]

export const router = createRouter({
  routes,
  history: createWebHistory(),
})
