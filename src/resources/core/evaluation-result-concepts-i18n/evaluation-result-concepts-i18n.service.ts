import { LOCALES } from '@constants/locales'
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { EvaluationResultConceptI18nInput } from '@evaluation-result-concepts-i18n/dto/evaluation-result-concept-i18n.input'
import { EvaluationResultConceptLocaleModel } from '@evaluation-result-concepts-i18n/entities/evaluation-result-concept-i18n.entity'
import { EvaluationResultConceptModel } from '@evaluation-result-concepts/entities/evaluation-result-concept.entity'
import { FindOptionsWhere, Repository } from 'typeorm'

@Injectable()
export class EvaluationResultConceptsI18nService {
  constructor(
    @InjectRepository(EvaluationResultConceptLocaleModel)
    private readonly repo: Repository<EvaluationResultConceptLocaleModel>
  ) {}

  async get(id: number): Promise<EvaluationResultConceptLocaleModel> {
    try {
      return await this.repo.findOneByOrFail({ id })
    } catch {
      throw new NotFoundException('Evaluation result concept not found')
    }
  }

  async getBy(
    options: FindOptionsWhere<EvaluationResultConceptLocaleModel> | FindOptionsWhere<EvaluationResultConceptLocaleModel>[]
  ): Promise<EvaluationResultConceptLocaleModel> {
      return await this.repo.findOneBy(options)
  }

  async create(
    evaluationResultConcept: EvaluationResultConceptModel,
    { locale = LOCALES.BR, description }: EvaluationResultConceptI18nInput
  ): Promise<EvaluationResultConceptLocaleModel> {
    return await this.repo.save(this.repo.create({ evaluationResultConcept, locale, description }))
  }

  async update(
    evaluationResultConcept: EvaluationResultConceptModel,
    { locale = LOCALES.BR, description }: EvaluationResultConceptI18nInput
  ): Promise<EvaluationResultConceptLocaleModel> {
    const evaluationResultConceptLocale = await this.getBy({ evaluationResultConcept: { id: evaluationResultConcept.id }, locale })
    this.repo.merge(evaluationResultConceptLocale, { description })
    return await this.repo.save(evaluationResultConceptLocale)
  }
}
