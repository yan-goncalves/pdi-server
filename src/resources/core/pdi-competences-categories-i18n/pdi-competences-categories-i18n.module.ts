import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PdiCompetenceCategoryLocaleModel } from '@pdi-competences-categories-i18n/entities/pdi-competence-category-i18n.entity'
import { PdiCompetencesCategoriesI18nService } from '@pdi-competences-categories-i18n/pdi-competences-categories-i18n.service'

@Module({
  imports: [TypeOrmModule.forFeature([PdiCompetenceCategoryLocaleModel])],
  providers: [PdiCompetencesCategoriesI18nService],
  exports: [PdiCompetencesCategoriesI18nService]
})
export class PdiCompetencesCategoriesI18nModule {}
