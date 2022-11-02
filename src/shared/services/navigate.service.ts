import { appConfig } from '@/config/app.config'
import type { RouteLocationNormalizedLoaded } from 'vue-router'

type NavigatePushOption = {
  app?: string
  query?: Record<string, string | number | string[] | number[]>
  params?: unknown
}

export class NavigateService {
  /**
   * 路由导航NavigateService
   * @param {string} path 路由路径
   * @param {NavigatePushOption} option 导航选项
   * @param {string} option.app 目标应用
   */
  public push(path: string, { app, query, params }: NavigatePushOption): void {
    window.$wujie?.bus.$emit('router:push', {
      app: app || appConfig.app,
      path,
      query,
      params,
    })
  }

  /**
   * 返回
   */
  public back() {
    window.$wujie?.bus.$emit('router:back')
  }

  /**
   * 返回当前路由参数
   * @returns {any} query参数
   */
  public get query() {
    const route = window.$wujie?.props?.route as RouteLocationNormalizedLoaded
    return route?.query
  }

  /**
   * 返回当前路由参数
   * @returns {any} params参数
   */
  public get params() {
    const route = window.$wujie?.props?.route as RouteLocationNormalizedLoaded
    return route?.params
  }
}
