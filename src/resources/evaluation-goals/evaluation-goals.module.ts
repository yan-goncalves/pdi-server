import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { EvaluationGoalModel } from '@evaluation-goals/entities/evaluation-goal.entity'
import { EvaluationGoalsResolver } from '@evaluation-goals/evaluation-goals.resolver'
import { EvaluationGoalsService } from '@evaluation-goals/evaluation-goals.service'

@Module({
  imports: [TypeOrmModule.forFeature([EvaluationGoalModel])],
  providers: [EvaluationGoalsResolver, EvaluationGoalsService],
  exports: [EvaluationGoalsService]
})
export class EvaluationGoalsModule {}
