import { AxiosAdapter } from '@gopowerteam/request/adapters'
import { ElMessage as Message } from 'element-plus'

import {
  type AdapterResponse,
  type RequestPlugin,
  type RequestSendOptions,
  type ResponseInterceptor,
  setup,
} from '@gopowerteam/request'

/**
 * 状态转换拦截器
 */
class StatusInterceptors implements ResponseInterceptor {
  /**
   * 执行操作
   * @param {AdapterResponse} response 响应对象
   * @returns {boolean} 执行状态
   */
  exec(response: AdapterResponse) {
    return response.status === 200
  }
}

/**
 * 成功状态转换拦截器
 */
class SuccessInterceptors implements ResponseInterceptor {
  /**
   * 执行操作
   * @param {AdapterResponse} response 响应对象
   * @returns  {any} 返回数据
   */
  exec(response: AdapterResponse) {
    return response.data
  }
}

/**
 * 错误转换拦截器
 */
class ErrorInterceptors implements ResponseInterceptor {
  /**
   * 执行操作
   * @param {AdapterResponse} response 响应对象
   * @returns {any} 返回数据
   */
  exec(response: AdapterResponse) {
    return response.data
  }
}

/**
 * 异常转换拦截器
 */
class ExceptionInterceptors implements ResponseInterceptor {
  /**
   * 执行操作
   */
  exec() {
    Message.info('系统内部错误，请稍后重试')
  }
}

/**
 * Token插件
 */
class TokenPlguin implements RequestPlugin {
  /**
   * 前置请求操作
   * @param {RequestSendOptions} options 请求参数
   */
  before(options: RequestSendOptions) {
    options.headers = {
      'X-EmployeeToken': '',
    }
  }
}

/**
 *
 */
export default function () {
  // 配置服务端信息
  setup({
    // 使用根服务网关地址
    gateway: $wujie.props?.gateway,
    adapter: new AxiosAdapter(),
    qs: {
      arrayFormat: 'repeat',
      skipNulls: true,
      allowDots: true,
      encodeValuesOnly: true,
      encode: true,
    },
    interceptors: {
      status: new StatusInterceptors(),
      success: new SuccessInterceptors(),
      error: new ErrorInterceptors(),
      exception: new ExceptionInterceptors(),
    },
    plugins: [new TokenPlguin()],
  })
}
// // 添加状态拦截器
// RequestService.interceptors.status.use((respone) => {
//   return respone.statusCode === 200
// })

// // 添加成功拦截器
// RequestService.interceptors.success.use((respone) => {
//   return respone.data
// })

// // 添加失败拦截器
// RequestService.interceptors.error.use((respone) => {
//   return respone
// })

// // 网络异常处理
// RequestService.requestCatchHandle = (respone) => {
//   // TODO: 退出登陆状态
//   // TODO: 清空用户信息
//   const defaultError = '服务通讯连接失败'
//   const messageList = new Map<number, string>([
//     [400, '请求参数错误'],
//     [405, '请求服务方法错误'],
//     [500, '服务器内部错误'],
//     [403, '用户未登录'],
//     [403, '无访问权限'],
//   ])

//   // TODO:空报文情况确认
//   if (!respone) return

//   // const responseMessage = (respone.errMsg || {}).message
//   // const errorMessage =
//   //     responseMessage ||
//   //     messageList.get(respone.status) ||
//   //     defaultError
//   switch (respone.statusCode) {
//     case 401:
//       onStateCode401(respone)
//       break
//   }
// }
