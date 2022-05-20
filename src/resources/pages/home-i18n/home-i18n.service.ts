import { LOCALES } from '@constants/locales'
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { HomeI18nInput } from '@pages/home-i18n/dto/home-i18n.input'
import { HomeLocaleModel } from '@pages/home-i18n/entities/home-i18n.entity'
import { HomeModel } from '@pages/home/entities/home.entity'
import { FindOptionsWhere, Repository } from 'typeorm'

@Injectable()
export class HomeI18nService {
  constructor(
    @InjectRepository(HomeLocaleModel)
    private readonly repo: Repository<HomeLocaleModel>
  ) {}

  async get(id: number): Promise<HomeLocaleModel> {
    try {
      return await this.repo.findOneByOrFail({ id })
    } catch {
      throw new NotFoundException('Home not found')
    }
  }

  async getBy(
    options: FindOptionsWhere<HomeLocaleModel> | FindOptionsWhere<HomeLocaleModel>[]
  ): Promise<HomeLocaleModel> {
    return await this.repo.findOneBy(options)
  }

  async create(
    home: HomeModel,
    { locale = LOCALES.BR, title, description }: HomeI18nInput
  ): Promise<HomeLocaleModel> {
    return await this.repo.save(this.repo.create({ home, locale, title, description }))
  }

  async update(
    home: HomeModel,
    { locale = LOCALES.BR, title }: HomeI18nInput
  ): Promise<HomeLocaleModel> {
    const homeLocale = await this.getBy({ home: { id: home.id }, locale })
    this.repo.merge(homeLocale, { title })
    return await this.repo.save(homeLocale)
  }
}
