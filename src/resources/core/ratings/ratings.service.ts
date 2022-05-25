import { LOCALES } from '@constants/locales'
import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { RatingsI18nService } from '@ratings-i18n/ratings-i18n.service'
import { CreateRatingInput } from '@ratings/dto/create-rating.input'
import { UpdateRatingInput } from '@ratings/dto/update-rating.input'
import { RatingModel } from '@ratings/entities/rating.entity'
import { Repository } from 'typeorm'

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(RatingModel) private readonly repo: Repository<RatingModel>,
    @Inject(RatingsI18nService) private readonly i18nService: RatingsI18nService
  ) {}

  async get(id: number): Promise<RatingModel> {
    try {
      return await this.repo.findOneBy({ id })
    } catch {
      throw new NotFoundException(`Rating with id '${id} not found`)
    }
  }

  async list(): Promise<RatingModel[]> {
    return await this.repo.find()
  }

  async create({ description, value }: CreateRatingInput): Promise<RatingModel> {
    try {
      const rating = await this.repo.save(this.repo.create({ value }))
      const ratingLocale = await this.i18nService.create(rating, { description })

      return {
        ...rating,
        description: ratingLocale.description
      }
    } catch {
      throw new ConflictException('Rating already exists')
    }
  }

  async update(
    id: number,
    { description, locale = LOCALES.BR }: UpdateRatingInput
  ): Promise<RatingModel> {
    const rating = await this.get(id)
    const ratingLocaleFound = await this.i18nService.getBy({ rating: { id }, locale })
    if (ratingLocaleFound?.description && ratingLocaleFound.description === description) {
      return {
        ...rating,
        description: ratingLocaleFound.description
      }
    }

    const ratingLocale = !ratingLocaleFound?.description
      ? await this.i18nService.create(rating, { description, locale })
      : await this.i18nService.update(rating, { description, locale })

    return {
      ...rating,
      description: ratingLocale.description
    }
  }
}
