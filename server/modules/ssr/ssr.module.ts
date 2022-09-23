import { Module, OnModuleInit } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import * as express from 'express';
import { join } from 'path';
import { createSsrServer } from 'vite-ssr/dev';

@Module({})
export class SSRModule implements OnModuleInit {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  async onModuleInit() {
    const httpAdapter = this.httpAdapterHost.httpAdapter;
    // Express Instance
    const app = httpAdapter.getInstance() as express.Express;
    const vite = await createSsrServer({
      server: { middlewareMode: true },
      appType: 'custom',
      getRenderContext: () => {
        return {
          initialState: {
            services: [{ name: 'test-01' }, { name: 'test-02' }],
          },
        };
      },
    } as any);

    // 安装SSR中间件
    app.use(vite.middlewares);
  }
}
