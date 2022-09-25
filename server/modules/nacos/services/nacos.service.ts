import { CACHE_MANAGER, Inject, Injectable, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NacosConfigClient, NacosNamingClient } from 'nacos'
import { HttpService } from '@nestjs/axios'
import { NACOS_ACCESS_TOKEN } from 'server/config/constants'
import type { Cache } from 'cache-manager'
import * as qs from 'qs'
import * as yaml from 'yaml'
import * as R from 'ramda'
import { lastValueFrom } from 'rxjs'

@Injectable()
export class NacosService implements OnModuleInit {
  // nacos客户端
  private static _namingClient: NacosNamingClient
  private static _configClient: NacosConfigClient
  private static _configMap = new Map<string, any>() // 应用配置数据

  constructor(
    private readonly config: ConfigService,
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private cache: Cache,
  ) {}

  async onModuleInit() {
    this.createNamingClient()
    this.createConfigClient()
  }

  public get namingClient() {
    return NacosService._namingClient
  }

  public get configClient() {
    return NacosService._configClient
  }

  public get configMap() {
    return NacosService._configMap
  }

  /**
   * 创建NACOS NamingClient
   * @returns
   */
  private createNamingClient() {
    const { host, port, username, password, namespace } =
      this.config.get('nacos')

    NacosService._namingClient = new NacosNamingClient({
      logger: console,
      serverList: `${host}:${port}`,
      namespace: namespace,
      username,
      password,
    } as any)

    return NacosService._namingClient.ready()
  }

  /**
   * 创建NACOS ConfigClient
   * @returns
   */
  private createConfigClient() {
    const { host, port, username, password } = this.config.get('nacos')

    NacosService._configClient = new NacosConfigClient({
      serverAddr: `${host}:${port}`,
      username,
      password,
    } as any)
  }

  /**
   * 订阅服务Config
   */
  public async subscribe(app: string) {
    // 应用前缀
    const { prefix, group } = this.config.get('nacos')
    let resolved = false
    // 订阅配置更新
    return new Promise<void>((resolve) => {
      NacosService._configClient.subscribe(
        {
          dataId: `${prefix}.${app}`,
          group,
        },
        (content: string) => {
          if (!resolved) {
            resolved = true
            resolve()
          }

          NacosService._configMap.set(app, yaml.parse(content))
        },
      )
    })
  }

  /**
   * 订阅服务Config
   */
  public async unsubscribe(app: string) {
    // 应用前缀
    const { prefix, group } = this.config.get('nacos.prefix')

    // 订阅配置更新
    return new Promise<void>((resolve) => {
      NacosService._configClient.unSubscribe(
        {
          dataId: `${prefix}.${app}`,
          group,
        },
        () => {
          resolve()
          NacosService._configMap.delete(app)
        },
      )
    })
  }

  /**
   * 获取配置数据
   */
  public get storage() {
    const app = this.config.get('app.name')

    return {
      get: R.curry(this.getStorage)(app).bind(this),
    }
  }

  /**
   * 获取配置
   * @param key
   * @returns
   */
  private getStorage(app: string, key?: string) {
    return key
      ? R.path(key.split('.'), NacosService._configMap.get(app))
      : NacosService._configMap.get(app)
  }

  /**
   * 请求配置数据
   * @returns
   */
  public async requestConfig(): Promise<any> {
    const { name } = this.config.get('app')
    const { prefix, group } = this.config.get('nacos')

    const accessToken = await this.getAccessToken()

    const query = qs.stringify({
      accessToken,
      dataId: `${prefix}.${name}`,
      group: group,
    })

    // 请求AccessToken
    return new Promise((resolve) => {
      this.httpService
        .get(`${this.getNacosAddress()}/nacos/v1/cs/configs?${query}`)
        .subscribe(({ data }) => {
          resolve(yaml.parse(data))
        })
    })
  }

  /**
   * 获取服务列表
   */
  public async requestServiceList(): Promise<string[]> {
    const accessToken = await this.getAccessToken()
    const group = this.config.get('nacos.group')

    const query = qs.stringify({
      accessToken,
      groupName: group,
      pageSize: 100,
      pageNo: 1,
    })

    return lastValueFrom(
      this.httpService.get(
        `${this.getNacosAddress()}/nacos/v1/ns/service/list?${query}`,
      ),
    )
      .then(({ data }) => data?.doms)
      .catch((ex) => {
        console.error(ex)
      })
  }

  /**
   * 请求AccessToken
   * @returns
   */
  private requestAccessToken() {
    const { username, password } = this.config.get('nacos')

    // 请求AccessToken
    return new Promise((resolve) => {
      this.httpService
        .post(
          `${this.getNacosAddress()}/nacos/v1/auth/login?username=${username}&password=${password}`,
        )
        .subscribe(({ data }) => {
          const { tokenTtl, accessToken } = data

          this.cache.set(NACOS_ACCESS_TOKEN, accessToken, tokenTtl)

          resolve(accessToken)
        })
    })
  }
  /**
   * 获取AccessToken
   * @returns
   */
  public async getAccessToken() {
    // 获取缓存AccessToken
    const accessToken = await this.cache.get(NACOS_ACCESS_TOKEN)

    if (accessToken) {
      return accessToken
    }

    return await this.requestAccessToken()
  }

  /**
   * 获取NACOS地址
   * @returns
   */
  public getNacosAddress() {
    const { protocol, host, port } = this.config.get('nacos')

    return `${protocol}://${host}:${port}`
  }
}
