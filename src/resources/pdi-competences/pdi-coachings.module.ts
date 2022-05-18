import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PdiCoachingModel } from '@pdi-coachings/entities/pdi-coaching.entity'
import { PdiCoachingsResolver } from '@pdi-coachings/pdi-coachings.resolver'
import { PdiCoachingsService } from '@pdi-coachings/pdi-coachings.service'

@Module({
  imports: [TypeOrmModule.forFeature([PdiCoachingModel])],
  providers: [PdiCoachingsResolver, PdiCoachingsService],
  exports: [PdiCoachingsService]
})
export class PdiCoachingsModule {}
