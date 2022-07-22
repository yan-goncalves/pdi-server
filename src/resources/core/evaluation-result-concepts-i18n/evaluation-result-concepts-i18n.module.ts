import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { EvaluationResultConceptLocaleModel } from '@evaluation-result-concepts-i18n/entities/evaluation-result-concept-i18n.entity'
import { EvaluationResultConceptsI18nService } from '@evaluation-result-concepts-i18n/evaluation-result-concepts-i18n.service'

@Module({
  imports: [TypeOrmModule.forFeature([EvaluationResultConceptLocaleModel])],
  providers: [EvaluationResultConceptsI18nService],
  exports: [EvaluationResultConceptsI18nService]
})
export class EvaluationResultConceptsI18nModule {}
