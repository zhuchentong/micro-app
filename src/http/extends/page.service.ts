import type {
  AdapterResponse,
  RequestPlugin,
  RequestSendOptions,
} from '@gopowerteam/request'
import type { Ref } from 'vue'
import type { PaginationOptions } from '@gopowerteam/vue-dynamic-table'

export class PageService implements RequestPlugin, PaginationOptions {
  pageIndex: Ref<number> = ref(1)
  pageSize: Ref<number> = ref(20)
  pageSizeOpts: number[] = [10, 20, 30, 40, 50]
  pageLayouts: (
    | 'PrevJump'
    | 'PrevPage'
    | 'JumpNumber'
    | 'NextPage'
    | 'NextJump'
    | 'Sizes'
    | 'FullJump'
    | 'Total'
  )[] = [
    'PrevJump',
    'PrevPage',
    'JumpNumber',
    'NextPage',
    'NextJump',
    'Sizes',
    'FullJump',
    'Total',
  ]
  total: Ref<number> = ref(0)

  /**
   * 构造函数
   * @param index
   * @param size
   */
  constructor(index = 1, size = 20) {
    this.pageIndex.value = index
    this.pageSize.value = size
  }

  /**
   * 重置操作
   */
  reset(): void {
    this.pageIndex.value = 1
  }

  /**
   * 前置操作
   * @param options
   */
  before(options: RequestSendOptions) {
    options.paramsQuery = {
      ...options.paramsQuery,
      page: this.pageIndex.value - 1,
      size: this.pageSize.value,
    }
  }

  /**
   * 后置操作
   * @param response
   */
  after(response: AdapterResponse) {
    this.total.value = response.data?.total
  }
}
