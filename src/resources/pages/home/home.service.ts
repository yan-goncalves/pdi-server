import { ButtonService } from '@components/button/button.service'
import { LOCALES } from '@constants/locales'
import { MediasService } from '@medias/medias.service'
import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { HomeI18nService } from '@pages/home-i18n/home-i18n.service'
import { CreateHomeInput } from '@pages/home/dto/create-home.input'
import { UpdateHomeInput } from '@pages/home/dto/update-home.input'
import { HomeModel } from '@pages/home/entities/home.entity'
import { Repository } from 'typeorm'

@Injectable()
export class HomeService {
  constructor(
    private homePage: HomeModel,
    @InjectRepository(HomeModel) private readonly repo: Repository<HomeModel>,
    @Inject(HomeI18nService) private readonly i18nService: HomeI18nService,
    @Inject(MediasService) private readonly mediasService: MediasService,
    @Inject(ButtonService) private readonly buttonService: ButtonService
  ) {}

  async get(id: number): Promise<HomeModel> {
    try {
      return await this.repo.findOneBy({ id })
    } catch {
      throw new NotFoundException(`Home with id '${id} not found`)
    }
  }

  async list(): Promise<HomeModel[]> {
    return await this.repo.find()
  }

  async create({ title, description, button, hero }: CreateHomeInput): Promise<HomeModel> {
    if (this.homePage) {
      const heroCreated = await this.mediasService.create(hero)
      const buttonCreated = await this.buttonService.create(button)
      const home = await this.repo.save(
        this.repo.create({
          hero: heroCreated,
          button: buttonCreated
        })
      )
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
    { title, description, hero, button, locale = LOCALES.BR }: UpdateHomeInput
  ): Promise<HomeModel> {
    const home = await this.get(id)
    const homeLocaleFound = await this.i18nService.getBy({ home: { id }, locale })
    if (
      homeLocaleFound?.title &&
      homeLocaleFound?.description &&
      homeLocaleFound.title === title &&
      homeLocaleFound.description === description
    ) {
      return {
        ...home,
        title: homeLocaleFound.title,
        description: homeLocaleFound.description
      }
    }

    const homeLocale = !homeLocaleFound?.title
      ? await this.i18nService.create(home, { title, description, locale })
      : await this.i18nService.update(home, { title, description, locale })

    return {
      ...home,
      title: homeLocale.title,
      description: homeLocale.description,
      hero: hero ?? home.hero,
      button: button ?? home.button
    }
  }
}
