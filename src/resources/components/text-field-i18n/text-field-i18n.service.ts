import { TextFieldI18nInput } from '@components/text-field-i18n/dto/text-field-i18n.input'
import { TextFieldLocaleModel } from '@components/text-field-i18n/entities/text-field-i18n.entity'
import { TextFieldModel } from '@components/text-field/entities/text-field.entity'
import { LOCALES } from '@constants/locales'
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOptionsWhere, Repository } from 'typeorm'

@Injectable()
export class TextFieldI18nService {
  constructor(
    @InjectRepository(TextFieldLocaleModel)
    private readonly repo: Repository<TextFieldLocaleModel>
  ) {}

  async get(id: number): Promise<TextFieldLocaleModel> {
    try {
      return await this.repo.findOneByOrFail({ id })
    } catch {
      throw new NotFoundException('Text field not found')
    }
  }

  async getBy(
    options: FindOptionsWhere<TextFieldLocaleModel> | FindOptionsWhere<TextFieldLocaleModel>[]
  ): Promise<TextFieldLocaleModel> {
    return await this.repo.findOneBy(options)
  }

  async create(
    textField: TextFieldModel,
    { locale = LOCALES.BR, labelPlaceholder }: TextFieldI18nInput
  ): Promise<TextFieldLocaleModel> {
    return await this.repo.save(this.repo.create({ textField, locale, labelPlaceholder }))
  }

  async update(
    textField: TextFieldModel,
    { locale = LOCALES.BR, labelPlaceholder }: TextFieldI18nInput
  ): Promise<TextFieldLocaleModel> {
    const textFieldLocale = await this.getBy({ textField: { id: textField.id }, locale })
    this.repo.merge(textFieldLocale, { labelPlaceholder })
    return await this.repo.save(textFieldLocale)
  }
}
