import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PdiCoachingModel } from '@pdi-coachings/entities/pdi-coaching.entity'
import { PdiCoachingsResolver } from '@pdi-coachings/pdi-coachings.resolver'
import { PdiCoachingsService } from '@pdi-coachings/pdi-coachings.service'
import { PerformedEvaluationsModule } from '@performed-evaluations/performed-evaluations.module'

@Module({
  imports: [TypeOrmModule.forFeature([PdiCoachingModel]), PerformedEvaluationsModule],
  providers: [PdiCoachingsResolver, PdiCoachingsService],
  exports: [PdiCoachingsService]
})
export class PdiCoachingsModule {}
