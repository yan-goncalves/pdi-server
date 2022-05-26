import { EvaluationGoalModel } from '@evaluations-goals/entities/evaluation-goal.entity'
import { EvaluationsGoalsResolver } from '@evaluations-goals/evaluations-goals.resolver'
import { EvaluationsGoalsService } from '@evaluations-goals/evaluations-goals.service'
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
  providers: [EvaluationsGoalsResolver, EvaluationsGoalsService],
  exports: [EvaluationsGoalsService]
})
export class EvaluationGoalsModule {}
