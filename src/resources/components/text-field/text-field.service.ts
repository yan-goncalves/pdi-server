import { TextFieldI18nService } from '@components/text-field-i18n/text-field-i18n.service'
import { CreateTextFieldInput } from '@components/text-field/dto/create-text-field.input'
import { UpdateTextFieldInput } from '@components/text-field/dto/update-text-field.input'
import { TextFieldModel } from '@components/text-field/entities/text-field.entity'
import { LOCALES } from '@constants/locales'
import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class TextFieldService {
  constructor(
    @InjectRepository(TextFieldModel) private readonly repo: Repository<TextFieldModel>,
    @Inject(TextFieldI18nService) private readonly i18nService: TextFieldI18nService
  ) {}

  async get(id: number): Promise<TextFieldModel> {
    try {
      return await this.repo.findOneBy({ id })
    } catch {
      throw new NotFoundException(`TextField with id '${id} not found`)
    }
  }

  async list(): Promise<TextFieldModel[]> {
    return await this.repo.find()
  }

  async create({ labelPlaceholder, ...input }: CreateTextFieldInput): Promise<TextFieldModel> {
    if (await this.i18nService.getBy({ labelPlaceholder })) {
      throw new ConflictException('TextField already exists')
    }

    const textField = await this.repo.save(this.repo.create({ ...input }))
    const textFieldLocale = await this.i18nService.create(textField, { labelPlaceholder })

    return {
      ...textField,
      labelPlaceholder: textFieldLocale.labelPlaceholder
    }
  }

  async update(
    id: number,
    { labelPlaceholder, locale = LOCALES.BR }: UpdateTextFieldInput
  ): Promise<TextFieldModel> {
    const textField = await this.get(id)
    const textFieldLocaleFound = await this.i18nService.getBy({ textField: { id }, locale })
    if (
      textFieldLocaleFound?.labelPlaceholder &&
      textFieldLocaleFound.labelPlaceholder === labelPlaceholder
    ) {
      return {
        ...textField,
        labelPlaceholder: textFieldLocaleFound.labelPlaceholder
      }
    }

    const textFieldLocale = !textFieldLocaleFound?.labelPlaceholder
      ? await this.i18nService.create(textField, { labelPlaceholder, locale })
      : await this.i18nService.update(textField, { labelPlaceholder, locale })

    return {
      ...textField,
      labelPlaceholder: textFieldLocale.labelPlaceholder
    }
  }
}
