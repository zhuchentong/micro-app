import { Module } from '@nestjs/common'
import { NacosModule } from '../nacos/nacos.module'
import { ScheduleService } from './services/schedule.service'
import { LaunchService } from './services/launch.service'
import { HttpModule } from '@nestjs/axios'

@Module({
  imports: [NacosModule, HttpModule],
  providers: [ScheduleService, LaunchService],
})
export class BootstrapModule {}
