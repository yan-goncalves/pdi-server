import { EvaluationsModule } from '@evaluations/evaluations.module'
import { GoalModel } from '@goals/entities/goal.entity'
import { GoalsResolver } from '@goals/goals.resolver'
import { GoalsService } from '@goals/goals.service'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersModule } from '@users/users.module'

@Module({
  imports: [TypeOrmModule.forFeature([GoalModel]), EvaluationsModule, UsersModule],
  providers: [GoalsResolver, GoalsService],
  exports: [GoalsService]
})
export class GoalsModule {}
