type Constructor<T> = new (...args: unknown[]) => T

/**
 * 实例化
 * @param {Constructor} InstanceClass 实例化类
 * @param {any} params 实例化参数
 * @returns {any} T 返回值
 */
export function useInstance<T>(InstanceClass: Constructor<T>, params?: any): T {
  // TODO: 是否做依赖注入采集
  const instance = new InstanceClass(params)

  return instance
}
