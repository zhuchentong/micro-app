import { appConfig } from '@/config/app.config'

type NavigatePushOption = {
  app?: string
  query?: Record<string, string | number | string[] | number[]>
  params?: unknown
}

export class NavigateService {
  /**
   * 路由导航
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
   * 返回当前路由参数
   */
  public get query() {
    return
  }

  /**
   * 返回当前路由参数
   */
  public get params() {
    return
  }
}
