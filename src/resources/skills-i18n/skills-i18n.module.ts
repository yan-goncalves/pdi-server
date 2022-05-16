import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SkillLocaleModel } from '@skills-i18n/entities/skill-18n.entity'
import { SkillsI18nService } from '@skills-i18n/skills-i18n.service'

@Module({
  imports: [TypeOrmModule.forFeature([SkillLocaleModel])],
  providers: [SkillsI18nService],
  exports: [SkillsI18nService]
})
export class SkillsI18nModule {}
