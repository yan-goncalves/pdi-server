import { EvaluationGoalModel } from '@evaluation-goals/entities/evaluation-goal.entity'
import { EvaluationGoalsResolver } from '@evaluation-goals/evaluation-goals.resolver'
import { EvaluationGoalsService } from '@evaluation-goals/evaluation-goals.service'
import { EvaluationsModule } from '@evaluations/evaluations.module'
import { GoalsModule } from '@goals/goals.module'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersModule } from '@users/users.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([EvaluationGoalModel]),
    EvaluationsModule,
    UsersModule,
    GoalsModule
  ],
  providers: [EvaluationGoalsResolver, EvaluationGoalsService],
  exports: [EvaluationGoalsService]
})
export class EvaluationGoalsModule {}
