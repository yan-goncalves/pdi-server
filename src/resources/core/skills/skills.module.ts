import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SkillsI18nModule } from '@skills-i18n/skills-i18n.module'
import { SkillModel } from '@skills/entities/skill.entity'
import { SkillsResolver } from '@skills/skills.resolver'
import { SkillsService } from '@skills/skills.service'

@Module({
  imports: [TypeOrmModule.forFeature([SkillModel]), SkillsI18nModule],
  providers: [SkillsResolver, SkillsService],
  exports: [SkillsService]
})
export class SkillsModule {}
