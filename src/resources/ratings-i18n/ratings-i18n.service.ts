import { LOCALES } from '@constants/locales'
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { RatingI18nInput } from '@ratings-i18n/dto/rating-i18n.input'
import { RatingLocaleModel } from '@ratings-i18n/entities/rating-i18n.entity'
import { RatingModel } from '@ratings/entities/rating.entity'
import { FindOptionsWhere, Repository } from 'typeorm'

@Injectable()
export class RatingsI18nService {
  constructor(
    @InjectRepository(RatingLocaleModel)
    private readonly repo: Repository<RatingLocaleModel>
  ) {}

  async get(id: number): Promise<RatingLocaleModel> {
    try {
      return await this.repo.findOneByOrFail({ id })
    } catch {
      throw new NotFoundException('Rating not found')
    }
  }

  async getBy(
    options: FindOptionsWhere<RatingLocaleModel> | FindOptionsWhere<RatingLocaleModel>[]
  ): Promise<RatingLocaleModel> {
      return await this.repo.findOneBy(options)
  }

  async create(
    rating: RatingModel,
    { locale = LOCALES.BR, description }: RatingI18nInput
  ): Promise<RatingLocaleModel> {
    return await this.repo.save(this.repo.create({ rating, locale, description }))
  }

  async update(
    rating: RatingModel,
    { locale = LOCALES.BR, description }: RatingI18nInput
  ): Promise<RatingLocaleModel> {
    const ratingLocale = await this.getBy({ rating: { id: rating.id }, locale })
    this.repo.merge(ratingLocale, { description })
    return await this.repo.save(ratingLocale)
  }
}
