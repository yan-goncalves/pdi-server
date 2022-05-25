import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PdiQualityModel } from '@pdi-qualities/entities/pdi-quality.entity'
import { PdiQualitiesResolver } from '@pdi-qualities/pdi-qualities.resolver'
import { PdiQualitiesService } from '@pdi-qualities/pdi-qualities.service'
import { PerformedEvaluationsModule } from '@performed-evaluations/performed-evaluations.module'

@Module({
  imports: [TypeOrmModule.forFeature([PdiQualityModel]), PerformedEvaluationsModule],
  providers: [PdiQualitiesResolver, PdiQualitiesService],
  exports: [PdiQualitiesService]
})
export class PdiQualitiesModule {}
