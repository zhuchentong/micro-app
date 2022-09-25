import generatedRoutes from 'virtual:generated-pages';
import { setupLayouts } from 'virtual:generated-layouts';
import type { RouteRecordRaw } from 'vue-router';

// 自定义路由
export const routes: RouteRecordRaw[] = [
  // 根目录跳转
  { path: '/', redirect: '/page1' },
  ...setupLayouts(generatedRoutes),
];
