import { EvaluationGoalKpiModel } from '@evaluations-goals-kpis/entities/evaluation-goal-kpi.entity'
import { EvaluationsGoalsKpisResolver } from '@evaluations-goals-kpis/evaluations-goals-kpis.resolver'
import { EvaluationsGoalsKpisService } from '@evaluations-goals-kpis/evaluations-goals-kpis.service'
import { EvaluationGoalsModule } from '@evaluations-goals/evaluations-goals.module'
import { KpisModule } from '@kpis/kpis.module'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([EvaluationGoalKpiModel]), EvaluationGoalsModule, KpisModule],
  providers: [EvaluationsGoalsKpisResolver, EvaluationsGoalsKpisService],
  exports: [EvaluationsGoalsKpisService]
})
export class EvaluationGoalsKpisModule {}
