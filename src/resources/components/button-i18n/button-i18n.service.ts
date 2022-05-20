import { ButtonI18nInput } from '@components/button-i18n/dto/button-i18n.input'
import { ButtonLocaleModel } from '@components/button-i18n/entities/button-i18n.entity'
import { ButtonModel } from '@components/button/entities/button.entity'
import { LOCALES } from '@constants/locales'
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOptionsWhere, Repository } from 'typeorm'

@Injectable()
export class ButtonI18nService {
  constructor(
    @InjectRepository(ButtonLocaleModel)
    private readonly repo: Repository<ButtonLocaleModel>
  ) {}

  async get(id: number): Promise<ButtonLocaleModel> {
    try {
      return await this.repo.findOneByOrFail({ id })
    } catch {
      throw new NotFoundException('Button not found')
    }
  }

  async getBy(
    options: FindOptionsWhere<ButtonLocaleModel> | FindOptionsWhere<ButtonLocaleModel>[]
  ): Promise<ButtonLocaleModel> {
    return await this.repo.findOneBy(options)
  }

  async create(
    button: ButtonModel,
    { locale = LOCALES.BR, label }: ButtonI18nInput
  ): Promise<ButtonLocaleModel> {
    return await this.repo.save(this.repo.create({ button, locale, label }))
  }

  async update(
    button: ButtonModel,
    { locale = LOCALES.BR, label, loadingLabel }: ButtonI18nInput
  ): Promise<ButtonLocaleModel> {
    const buttonLocale = await this.getBy({ button: { id: button.id }, locale })
    this.repo.merge(buttonLocale, { label, loadingLabel })
    return await this.repo.save(buttonLocale)
  }
}
