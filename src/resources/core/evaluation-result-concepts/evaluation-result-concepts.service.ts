import { LOCALES } from '@constants/locales'
import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { EvaluationResultConceptsI18nService } from '@evaluation-result-concepts-i18n/evaluation-result-concepts-i18n.service'
import { CreateEvaluationResultConceptInput } from '@evaluation-result-concepts/dto/create-evaluation-result-concept.input'
import { UpdateEvaluationResultConceptInput } from '@evaluation-result-concepts/dto/update-evaluation-result-concept.input'
import { EvaluationResultConceptModel } from '@evaluation-result-concepts/entities/evaluation-result-concept.entity'
import { Repository } from 'typeorm'

@Injectable()
export class EvaluationResultConceptsService {
  constructor(
    @InjectRepository(EvaluationResultConceptModel) private readonly repo: Repository<EvaluationResultConceptModel>,
    @Inject(EvaluationResultConceptsI18nService) private readonly i18nService: EvaluationResultConceptsI18nService
  ) {}

  async get(id: number): Promise<EvaluationResultConceptModel> {
    try {  
      return await this.repo.findOneBy({ id })
    } catch {
      throw new NotFoundException(`EvaluationResultConcept with id '${id} not found`)
    }
  }

  async list(): Promise<EvaluationResultConceptModel[]> {
    return await this.repo.find()
  }

  async create({ description, ...input }: CreateEvaluationResultConceptInput): Promise<EvaluationResultConceptModel> {
    if (await this.i18nService.getBy({ description })) {
      throw new ConflictException('EvaluationResultConcept already exists')
    }

    const evaluationResultConcept = await this.repo.save(this.repo.create({ ...input }))
    const evaluationResultConceptLocale = await this.i18nService.create(evaluationResultConcept, { description })

    return { 
      ...evaluationResultConcept, 
      description: evaluationResultConceptLocale.description 
    }
  }

  async update(
    id: number,
    { description, locale = LOCALES.BR }: UpdateEvaluationResultConceptInput
  ): Promise<EvaluationResultConceptModel> {
    const evaluationResultConcept = await this.get(id)
    const evaluationResultConceptLocaleFound = await this.i18nService.getBy({ evaluationResultConcept: { id }, locale })
    if (evaluationResultConceptLocaleFound?.description && evaluationResultConceptLocaleFound.description === description) {
      return {
        ...evaluationResultConcept,
        description: evaluationResultConceptLocaleFound.description
      }
    }

    const evaluationResultConceptLocale = !evaluationResultConceptLocaleFound?.description
      ? await this.i18nService.create(evaluationResultConcept, { description, locale })
      : await this.i18nService.update(evaluationResultConcept, { description, locale })

    return { 
      ...evaluationResultConcept, 
      description: evaluationResultConceptLocale.description 
    }
  }
}
