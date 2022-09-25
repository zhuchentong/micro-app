import { Module, OnModuleInit } from '@nestjs/common'
import { HttpAdapterHost } from '@nestjs/core'
import * as express from 'express'
import * as path from 'node:path'
import type { Express } from 'express'
import { createSsrServer } from 'vite-ssr/dev'
import * as compression from 'compression'
import { isDevEnv } from 'server/shared/common'
import { NacosService } from '../nacos/services/nacos.service'
import { NacosModule } from '../nacos/nacos.module'

@Module({ imports: [NacosModule] })
export class SSRModule implements OnModuleInit {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly nacos: NacosService,
  ) {}

  private getInitialState() {
    return {
      services: Array.from(this.nacos.configMap.values()),
      // services: [{ name: 'test-01' }, { name: 'test-02' }],
    }
  }

  /**
   * 配置开发SSR
   */
  private async setupDevSSR(app: Express) {
    const vite = await createSsrServer({
      server: { middlewareMode: true },
      appType: 'custom',
      getRenderContext: async () => {
        return {
          initialState: this.getInitialState(),
        }
      },
    } as any)

    // 安装SSR中间件
    app.use(vite.middlewares)
  }

  private async setupProdSSR(app: Express) {
    const dist = path.resolve(process.cwd(), 'dist')
    // const { ssr } = await import(`${dist}/server/package.json`)
    const manifest = await import(`${dist}/client/ssr-manifest.json`)
    const { default: render } = await import(`${dist}/server/main.js`)

    app.use(compression())
    app.get(
      '*.*',
      express.static(path.join(process.cwd(), 'dist/client'), {
        index: false,
        maxAge: '1y',
        setHeaders: (res: any) => {
          res.header('Access-Control-Allow-Origin', '*')
          res.header('Access-Control-Allow-Methods', 'GET')
          res.header('Access-Control-Allow-Headers', 'Content-Type')
        },
      }),
    )

    app.get('*', async (request, response) => {
      const url =
        request.protocol + '://' + request.get('host') + request.originalUrl

      const initialState = this.getInitialState()
      const { html, status, statusText, headers } = await render(url, {
        manifest,
        preload: true,
        request,
        response,
        initialState,
      })

      response.type('html')
      response.writeHead(status || 200, statusText || headers, headers)
      response.end(html)
    })
  }

  async onModuleInit() {
    const httpAdapter = this.httpAdapterHost.httpAdapter
    // Express Instance
    const app = httpAdapter.getInstance() as express.Express
    if (isDevEnv()) {
      await this.setupDevSSR(app)
    } else {
      await this.setupProdSSR(app)
    }
  }
}
