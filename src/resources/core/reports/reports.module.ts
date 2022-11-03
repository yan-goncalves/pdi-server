import { Module } from '@nestjs/common'
import { PerformedEvaluationsModule } from '@performed-evaluations/performed-evaluations.module'
import { ReportsController } from './reports.controller'
import { ReportsService } from './reports.service'

@Module({
  imports: [PerformedEvaluationsModule],
  controllers: [ReportsController],
  providers: [ReportsService],
  exports: []
})
export class ReportsModule {}
