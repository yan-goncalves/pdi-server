import { LOCALES } from '@constants/locales'
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { SignInI18nInput } from '@pages/sign-in-i18n/dto/sign-in-i18n.input'
import { SignInLocaleModel } from '@pages/sign-in-i18n/entities/sign-in-i18n.entity'
import { SignInModel } from '@pages/sign-in/entities/sign-in.entity'
import { FindOptionsWhere, Repository } from 'typeorm'

@Injectable()
export class SignInI18nService {
  constructor(
    @InjectRepository(SignInLocaleModel)
    private readonly repo: Repository<SignInLocaleModel>
  ) {}

  async get(id: number): Promise<SignInLocaleModel> {
    try {
      return await this.repo.findOneByOrFail({ id })
    } catch {
      throw new NotFoundException('Sign in not found')
    }
  }

  async getBy(
    options: FindOptionsWhere<SignInLocaleModel> | FindOptionsWhere<SignInLocaleModel>[]
  ): Promise<SignInLocaleModel> {
    return await this.repo.findOneBy(options)
  }

  async create(
    signIn: SignInModel,
    { locale = LOCALES.BR, title, caption }: SignInI18nInput
  ): Promise<SignInLocaleModel> {
    return await this.repo.save(this.repo.create({ signIn, locale, title, caption }))
  }

  async update(
    signIn: SignInModel,
    { locale = LOCALES.BR, title, caption }: SignInI18nInput
  ): Promise<SignInLocaleModel> {
    const signInLocale = await this.getBy({ signIn: { id: signIn.id }, locale })
    this.repo.merge(signInLocale, { title, caption })
    return await this.repo.save(signInLocale)
  }
}
