import type { RequestPlugin } from '@gopowerteam/request'
import type { Ref } from 'vue'

export class LoadingService implements RequestPlugin {
  /**
   * Http loading
   * @param loadingStatus
   */
  constructor(private loadingStatus: Ref<boolean>) {}

  /**
   * 请求前置操作
   */
  public before = () => {
    this.loadingStatus.value = true
  }

  /**
   * 请求后置操作
   */
  public after = () => {
    this.loadingStatus.value = false
  }

  /**
   * catch 服务请求失败的时候处理
   */
  public catch = () => {
    this.loadingStatus.value = false
  }
}
