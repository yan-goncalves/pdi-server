import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PdiCompetencesCategoriesI18nModule } from '@pdi-competences-categories-i18n/pdi-competences-categories-i18n.module'
import { PdiCompetenceCategoryModel } from '@pdi-competences-categories/entities/pdi-competence-category.entity'
import { PdiCompetencesCategoriesResolver } from '@pdi-competences-categories/pdi-competences-categories.resolver'
import { PdiCompetencesCategoriesService } from '@pdi-competences-categories/pdi-competences-categories.service'

@Module({
  imports: [TypeOrmModule.forFeature([PdiCompetenceCategoryModel]), PdiCompetencesCategoriesI18nModule],
  providers: [PdiCompetencesCategoriesResolver, PdiCompetencesCategoriesService],
  exports: [PdiCompetencesCategoriesService]
})
export class PdiCompetencesCategoriesModule {}
