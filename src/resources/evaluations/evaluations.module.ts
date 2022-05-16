import { EvaluationModel } from '@evaluations/entities/evaluation.entity'
import { EvaluationsResolver } from '@evaluations/evaluations.resolver'
import { EvaluationsService } from '@evaluations/evaluations.service'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SectionsModule } from '@sections/sections.module'

@Module({
  imports: [TypeOrmModule.forFeature([EvaluationModel]), SectionsModule],
  providers: [EvaluationsResolver, EvaluationsService],
  exports: [EvaluationsService]
})
export class EvaluationsModule {}
