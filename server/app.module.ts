import { CacheModule, Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { SSRModule } from './modules/ssr/ssr.module'
import { NacosModule } from './modules/nacos/nacos.module'
import { BootstrapModule } from './modules/bootstrap/bootstrap.module'
import { ConfigModule } from '@nestjs/config'
import configuration from './config/configuration'
import { ScheduleModule } from '@nestjs/schedule'
import { isDevEnv } from 'server/shared/common'
@Module({
  imports: [
    // 配置服务
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: !isDevEnv(),
      envFilePath: ['.env.development'],
      load: [configuration],
    }),
    // 缓存服务
    CacheModule.register({
      isGlobal: true,
    }),
    // 定时服务
    ScheduleModule.forRoot(),
    SSRModule,
    NacosModule,
    BootstrapModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
