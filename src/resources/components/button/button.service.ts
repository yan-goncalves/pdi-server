import { ButtonI18nService } from '@components/button-i18n/button-i18n.service'
import { CreateButtonInput } from '@components/button/dto/create-button.input'
import { UpdateButtonInput } from '@components/button/dto/update-button.input'
import { ButtonModel } from '@components/button/entities/button.entity'
import { LOCALES } from '@constants/locales'
import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class ButtonService {
  constructor(
    @InjectRepository(ButtonModel) private readonly repo: Repository<ButtonModel>,
    @Inject(ButtonI18nService) private readonly i18nService: ButtonI18nService
  ) {}

  async get(id: number): Promise<ButtonModel> {
    try {
      return await this.repo.findOneBy({ id })
    } catch {
      throw new NotFoundException(`Button with id '${id} not found`)
    }
  }

  async list(): Promise<ButtonModel[]> {
    return await this.repo.find()
  }

  async create({ label, loadingLabel }: CreateButtonInput): Promise<ButtonModel> {
    const buttonFound = await this.i18nService.getBy([{ label }, { loadingLabel }])
    if (buttonFound) {
      return {
        ...buttonFound.button,
        label: buttonFound.label,
        loadingLabel: buttonFound?.loadingLabel
      }
    }
    const button = await this.repo.save(this.repo.create())
    const buttonLocale = await this.i18nService.create(button, { label, loadingLabel })

    return {
      ...button,
      label: buttonLocale.label,
      loadingLabel: buttonLocale?.loadingLabel
    }
  }

  async update(
    id: number,
    { label, loadingLabel, locale = LOCALES.BR }: UpdateButtonInput
  ): Promise<ButtonModel> {
    const button = await this.get(id)
    const buttonLocaleFound = await this.i18nService.getBy({ button: { id }, locale })
    if (
      buttonLocaleFound?.label &&
      buttonLocaleFound?.loadingLabel &&
      buttonLocaleFound.label === label &&
      buttonLocaleFound.loadingLabel === loadingLabel
    ) {
      return {
        ...button,
        label: buttonLocaleFound.label,
        loadingLabel: buttonLocaleFound.loadingLabel
      }
    }

    const buttonLocale = !buttonLocaleFound?.label
      ? await this.i18nService.create(button, { label, loadingLabel, locale })
      : await this.i18nService.update(button, { label, loadingLabel, locale })

    return {
      ...button,
      label: buttonLocale.label,
      loadingLabel: buttonLocale.loadingLabel
    }
  }
}
