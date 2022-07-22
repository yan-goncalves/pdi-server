import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PdiCompetenceCategoryModel } from '@pdi-competences-categories/entities/pdi-competence-category.entity'
import { PdiCompetencesCategoriesResolver } from '@pdi-competences-categories/pdi-competences-categories.resolver'
import { PdiCompetencesCategoriesService } from '@pdi-competences-categories/pdi-competences-categories.service'

@Module({
  imports: [TypeOrmModule.forFeature([PdiCompetenceCategoryModel])],
  providers: [PdiCompetencesCategoriesResolver, PdiCompetencesCategoriesService],
  exports: [PdiCompetencesCategoriesService]
})
export class PdiCompetencesCategoriesModule {}
