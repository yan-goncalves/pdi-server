import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { EvaluationModel } from '@evaluations/entities/evaluation.entity'
import { EvaluationsResolver } from '@evaluations/evaluations.resolver'
import { EvaluationsService } from '@evaluations/evaluations.service'

@Module({
  imports: [TypeOrmModule.forFeature([EvaluationModel])],
  providers: [EvaluationsResolver, EvaluationsService],
  exports: [EvaluationsService]
})
export class EvaluationsModule {}
