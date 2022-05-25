import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PdiCompetencesCategoriesModule } from '@pdi-competences-categories/pdi-competences-categories.module'
import { PdiCompetenceModel } from '@pdi-competences/entities/pdi-competence.entity'
import { PdiCompetencesResolver } from '@pdi-competences/pdi-competences.resolver'
import { PdiCompetencesService } from '@pdi-competences/pdi-competences.service'
import { PerformedEvaluationsModule } from '@performed-evaluations/performed-evaluations.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([PdiCompetenceModel]),
    PerformedEvaluationsModule,
    PdiCompetencesCategoriesModule
  ],
  providers: [PdiCompetencesResolver, PdiCompetencesService],
  exports: [PdiCompetencesService]
})
export class PdiCompetencesModule {}
