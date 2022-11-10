import type { RequestPlugin, RequestSendOptions } from '@gopowerteam/request'
import { useStore } from '@/store'

export class TokenService implements RequestPlugin {
  /**
   * 前置Token
   * @param options
   */
  public before(options: RequestSendOptions) {
    const store = useStore()
    if (store.user.token) {
      options.headers = {
        ...options.headers,
        ['Authorization']: `${store.user.token}`,
      }
    }
  }
}
