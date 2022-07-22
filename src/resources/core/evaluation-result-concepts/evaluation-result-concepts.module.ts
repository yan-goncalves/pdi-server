import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { EvaluationResultConceptsI18nModule } from '@evaluation-result-concepts-i18n/evaluation-result-concepts-i18n.module'
import { EvaluationResultConceptModel } from '@evaluation-result-concepts/entities/evaluation-result-concept.entity'
import { EvaluationResultConceptsResolver } from '@evaluation-result-concepts/evaluation-result-concepts.resolver'
import { EvaluationResultConceptsService } from '@evaluation-result-concepts/evaluation-result-concepts.service'

@Module({
  imports: [TypeOrmModule.forFeature([EvaluationResultConceptModel]), EvaluationResultConceptsI18nModule],
  providers: [EvaluationResultConceptsResolver, EvaluationResultConceptsService],
  exports: [EvaluationResultConceptsService]
})
export class EvaluationResultConceptsModule {}
