import { Injectable, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NacosService } from 'server/modules/nacos/services/nacos.service'
import { getIPAddress } from 'server/shared/common'

@Injectable()
export class LaunchService implements OnModuleInit {
  constructor(
    private readonly config: ConfigService,
    private readonly nacos: NacosService,
  ) {}

  async onModuleInit() {
    // await this.subscribeNacosConfig()
    // await this.registerNacosService()
  }

  /**
   * 订阅Nacos配置
   */
  private subscribeNacosConfig() {
    const app = this.config.get('app.name')

    return this.nacos.subscribe(app)
  }

  /**
   * 注册Nacos服务
   */
  private registerNacosService() {
    // 开发模式不注册实例
    if (process.env['NODE_ENV'] === 'development') {
      return
    }

    const name = this.config.get('app.name')
    const prefix = this.config.get('nacos.prefix')
    const group = this.config.get('nacos.group')
    const port = this.nacos.storage.get('app.port')
    const ip = getIPAddress()

    return this.nacos.namingClient.registerInstance(
      `${prefix}.${name}`,
      {
        ip,
        port,
        ephemeral: true,
      },
      group,
    )
  }
}
