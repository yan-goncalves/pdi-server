import { ButtonService } from '@components/button/button.service'
import { LOCALES } from '@constants/locales'
import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { HomeI18nService } from '@pages/home-i18n/home-i18n.service'
import { CreateHomeInput } from '@pages/home/dto/create-home.input'
import { UpdateHomeInput } from '@pages/home/dto/update-home.input'
import { HomeModel } from '@pages/home/entities/home.entity'
import { Repository } from 'typeorm'

@Injectable()
export class HomeService {
  private homePage: HomeModel

  constructor(
    @InjectRepository(HomeModel) private readonly repo: Repository<HomeModel>,
    @Inject(HomeI18nService) private readonly i18nService: HomeI18nService,
    @Inject(ButtonService) private readonly buttonService: ButtonService
  ) {
    this.repo
      .find()
      .then((homePages) => (this.homePage = homePages[0]))
      .catch(() => (this.homePage = null))
  }

  async get(id?: number): Promise<HomeModel> {
    const isNumber = typeof id === 'number'
    try {
      return await this.repo.findOneByOrFail({ id: !isNumber ? this.homePage?.id : id })
    } catch {
      throw new NotFoundException(
        `${!isNumber ? 'Home page not created' : `Home with id '${id} not found`}`
      )
    }
  }

  async create({ title, description, button }: CreateHomeInput): Promise<HomeModel> {
    if (!this.homePage) {
      const buttonCreated = await this.buttonService.create(button)
      const home = await this.repo.save(this.repo.create({ button: buttonCreated }))
      const homeLocale = await this.i18nService.create(home, { title, description })
      this.homePage = {
        ...home,
        title: homeLocale.title,
        description: homeLocale.description
      }
    }

    return this.homePage
  }

  async update(
    id: number,
    { title, description, button, locale = LOCALES.BR }: UpdateHomeInput
  ): Promise<HomeModel> {
    let existingIndex = false
    const home = await this.get(id)
    const homeLocaleFound = await this.i18nService.getBy({ home: { id }, locale })

    const updateButton = !home?.button
      ? !button
        ? null
        : await this.buttonService.create({ ...button })
      : await this.buttonService.update(home.button.id, { ...button, locale })

    if (
      homeLocaleFound?.title &&
      homeLocaleFound?.description &&
      homeLocaleFound.title === title &&
      homeLocaleFound.description === description
    ) {
      existingIndex = true
    }

    const homeLocale = !homeLocaleFound?.title
      ? await this.i18nService.create(home, { title, description, locale })
      : await this.i18nService.update(home, { title, description, locale })

    await this.repo.update(home.id, { button: updateButton })

    return {
      ...home,
      title: !existingIndex ? homeLocale.title : title,
      description: !existingIndex ? homeLocale.description : description,
      button: updateButton
    }
  }

  async setImage(filename: string): Promise<void> {
    await this.repo.update(this.homePage.id, { hero: filename })
  }
}
