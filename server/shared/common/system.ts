import * as os from 'os'

/**
 * 获取本地IP地址
 * @returns
 */
export function getIPAddress(): string {
  const interfaces = os.networkInterfaces()
  for (const devName in interfaces) {
    if (!interfaces.hasOwnProperty(devName)) {
      continue
    }

    const iface = interfaces[devName]

    for (const alias of iface) {
      if (
        alias.family === 'IPv4' &&
        alias.address !== '127.0.0.1' &&
        !alias.internal
      ) {
        return alias.address
      }
    }
  }

  return ''
}
