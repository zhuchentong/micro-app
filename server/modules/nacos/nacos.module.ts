import { Module } from '@nestjs/common'
import { NacosService } from './services/nacos.service'
import { HttpModule } from '@nestjs/axios'

@Module({
  imports: [HttpModule],
  providers: [NacosService],
  exports: [NacosService],
})
export class NacosModule {}
