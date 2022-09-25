import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Cron, CronExpression } from '@nestjs/schedule'
import { NacosService } from 'server/modules/nacos/services/nacos.service'

@Injectable()
export class ScheduleService {
  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
    private readonly nacos: NacosService,
  ) {}

  /**
   * 订阅应用服务列表
   */
  // @Cron(CronExpression.EVERY_MINUTE)
  public async subscribeNacosServices() {
    const prefix = this.config.get('nacos.prefix')
    // 当前服务列表
    const services = await (
      await this.nacos.requestServiceList()
    ).map((service) => {
      const [name] = service.split(`${prefix}.`).filter((x) => x)
      return name
    })

    //添加订阅
    services.forEach((service) => {
      if (!this.nacos.configMap.has(service)) {
        this.nacos.subscribe(service)
      }
    })

    //删除订阅
    Array.from(this.nacos.configMap.keys()).forEach((service) => {
      if (!services.includes(service)) {
        this.nacos.subscribe(service)
      }
    })
  }

  /**
   * 发送Nacos心跳包
   */
  // @Cron(CronExpression.EVERY_5_SECONDS)
  async sendNacosHealthBeat() {
    // 开发模式不进行心跳
    if (process.env['NODE_ENV'] === 'development') {
      return
    }

    const { name } = this.config.get('app')
    const { host, port } = this.config.get('nacos')

    const accessToken = await this.nacos.getAccessToken()

    this.http.put(
      `${this.nacos.getNacosAddress()}/nacos/v1/ns/instance/beat?accessToken=${accessToken}&serviceName=${name}`,
      {
        serviceName: name,
        ip: host,
        port: port,
        beat: JSON.stringify({
          ip: host,
          port: port,
          schedule: true,
          serviceName: name,
        }),
      },
    )
  }
}
