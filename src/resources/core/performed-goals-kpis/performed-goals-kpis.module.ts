import { EvaluationGoalsKpisModule } from '@evaluations-goals-kpis/evaluations-goals-kpis.module'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PerformedEvaluationsModule } from '@performed-evaluations/performed-evaluations.module'
import { PerformedGoalKpiModel } from '@performed-goals-kpis/entities/performed-goal-kpi.entity'
import { PerformedGoalsKpisResolver } from '@performed-goals-kpis/performed-goals-kpis.resolver'
import { PerformedGoalsKpisService } from '@performed-goals-kpis/performed-goals-kpis.service'
import { RatingsModule } from '@ratings/ratings.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([PerformedGoalKpiModel]),
    PerformedEvaluationsModule,
    EvaluationGoalsKpisModule,
    RatingsModule
  ],
  providers: [PerformedGoalsKpisResolver, PerformedGoalsKpisService],
  exports: [PerformedGoalsKpisService]
})
export class PerformedGoalsKpisModule {}
