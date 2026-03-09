import { CalibrationsModule } from '@calibrations/calibrations.module'
import { EvaluationApprovalsModule } from '@evaluation-approvals/evaluation-approvals.module'
import { EvaluationsModule } from '@evaluations/evaluations.module'
import { Module, forwardRef } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PerformedEvaluationModel } from '@performed-evaluations/entities/performed-evaluation.entity'
import { PerformedEvaluationsResolver } from '@performed-evaluations/performed-evaluations.resolver'
import { PerformedEvaluationsService } from '@performed-evaluations/performed-evaluations.service'
import { UsersModule } from '@users/users.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([PerformedEvaluationModel]),
    EvaluationsModule,
    UsersModule,
    forwardRef(() => EvaluationApprovalsModule),
    forwardRef(() => CalibrationsModule)
  ],
  providers: [PerformedEvaluationsResolver, PerformedEvaluationsService],
  exports: [PerformedEvaluationsService]
})
export class PerformedEvaluationsModule {}
