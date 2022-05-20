import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PerformedEvaluationsModule } from '@performed-evaluations/performed-evaluations.module'
import { PerformedSkillModel } from '@performed-skills/entities/performed-skill.entity'
import { PerformedSkillsResolver } from '@performed-skills/performed-skills.resolver'
import { PerformedSkillsService } from '@performed-skills/performed-skills.service'
import { RatingsModule } from '@ratings/ratings.module'
import { SkillsModule } from '@skills/skills.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([PerformedSkillModel]),
    PerformedEvaluationsModule,
    SkillsModule,
    RatingsModule
  ],
  providers: [PerformedSkillsResolver, PerformedSkillsService],
  exports: [PerformedSkillsService]
})
export class PerformedSkillsModule {}
