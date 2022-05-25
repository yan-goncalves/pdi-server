import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PerformedEvaluationsModule } from '@performed-evaluations/performed-evaluations.module'
import { PdiCoachingModel } from 'src/resources/core/pdi-coachings/entities/pdi-coaching.entity'
import { PdiCoachingsResolver } from 'src/resources/core/pdi-coachings/pdi-coachings.resolver'
import { PdiCoachingsService } from 'src/resources/core/pdi-coachings/pdi-coachings.service'

@Module({
  imports: [TypeOrmModule.forFeature([PdiCoachingModel]), PerformedEvaluationsModule],
  providers: [PdiCoachingsResolver, PdiCoachingsService],
  exports: [PdiCoachingsService]
})
export class PdiCoachingsModule {}
