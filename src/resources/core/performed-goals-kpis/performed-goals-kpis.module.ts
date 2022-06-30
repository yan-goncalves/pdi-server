import { KpisModule } from '@kpis/kpis.module'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PerformedGoalKpiModel } from '@performed-goals-kpis/entities/performed-goal-kpi.entity'
import { PerformedGoalsKpisResolver } from '@performed-goals-kpis/performed-goals-kpis.resolver'
import { PerformedGoalsKpisService } from '@performed-goals-kpis/performed-goals-kpis.service'
import { PerformedGoalsModule } from '@performed-goals/performed-goals.module'
import { RatingsModule } from '@ratings/ratings.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([PerformedGoalKpiModel]),
    PerformedGoalsModule,
    KpisModule,
    RatingsModule
  ],
  providers: [PerformedGoalsKpisResolver, PerformedGoalsKpisService],
  exports: [PerformedGoalsKpisService]
})
export class PerformedGoalsKpisModule {}
