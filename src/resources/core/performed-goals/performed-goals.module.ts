import { GoalsModule } from '@goals/goals.module'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PerformedEvaluationsModule } from '@performed-evaluations/performed-evaluations.module'
import { PerformedGoalModel } from '@performed-goals/entities/performed-goal.entity'
import { PerformedGoalsResolver } from '@performed-goals/performed-goals.resolver'
import { PerformedGoalsService } from '@performed-goals/performed-goals.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([PerformedGoalModel]),
    PerformedEvaluationsModule,
    GoalsModule
  ],
  providers: [PerformedGoalsResolver, PerformedGoalsService],
  exports: [PerformedGoalsService]
})
export class PerformedGoalsModule {}
