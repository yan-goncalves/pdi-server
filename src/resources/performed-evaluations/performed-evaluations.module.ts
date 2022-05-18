import { EvaluationsModule } from '@evaluations/evaluations.module'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PerformedEvaluationModel } from '@performed-evaluations/entities/performed-evaluation.entity'
import { PerformedEvaluationsResolver } from '@performed-evaluations/performed-evaluations.resolver'
import { PerformedEvaluationsService } from '@performed-evaluations/performed-evaluations.service'
import { UsersModule } from '@users/users.module'

@Module({
  imports: [TypeOrmModule.forFeature([PerformedEvaluationModel]), EvaluationsModule, UsersModule],
  providers: [PerformedEvaluationsResolver, PerformedEvaluationsService],
  exports: [PerformedEvaluationsService]
})
export class PerformedEvaluationsModule {}
