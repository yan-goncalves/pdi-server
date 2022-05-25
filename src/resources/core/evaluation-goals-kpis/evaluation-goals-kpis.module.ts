import { EvaluationGoalKpiModel } from '@evaluation-goals-kpis/entities/evaluation-goal-kpi.entity'
import { EvaluationGoalsKpisResolver } from '@evaluation-goals-kpis/evaluation-goals-kpis.resolver'
import { EvaluationGoalsKpisService } from '@evaluation-goals-kpis/evaluation-goals-kpis.service'
import { EvaluationGoalsModule } from '@evaluation-goals/evaluation-goals.module'
import { KpisModule } from '@kpis/kpis.module'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([EvaluationGoalKpiModel]), EvaluationGoalsModule, KpisModule],
  providers: [EvaluationGoalsKpisResolver, EvaluationGoalsKpisService],
  exports: [EvaluationGoalsKpisService]
})
export class EvaluationGoalsKpisModule {}
