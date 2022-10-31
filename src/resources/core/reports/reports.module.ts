import { UsersModule } from '@core/users/users.module'
import { Module } from '@nestjs/common'
import { ReportsController } from './reports.controller'
import { ReportsService } from './reports.service'

@Module({
  imports: [UsersModule],
  controllers: [ReportsController],
  providers: [ReportsService],
  exports: []
})
export class ReportsModule {}
