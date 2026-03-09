import { EvaluationApprovalModel } from '@evaluation-approvals/entities/evaluation-approval.entity'
import { EvaluationApprovalsResolver } from '@evaluation-approvals/evaluation-approvals.resolver'
import { EvaluationApprovalsService } from '@evaluation-approvals/evaluation-approvals.service'
import { Module, forwardRef } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PerformedEvaluationsModule } from '@performed-evaluations/performed-evaluations.module'
import { UsersModule } from '@users/users.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([EvaluationApprovalModel]),
    forwardRef(() => PerformedEvaluationsModule),
    UsersModule
  ],
  providers: [EvaluationApprovalsResolver, EvaluationApprovalsService],
  exports: [EvaluationApprovalsService]
})
export class EvaluationApprovalsModule {}

