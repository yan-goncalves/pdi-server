import { ButtonService } from '@components/button/button.service'
import { TextFieldService } from '@components/text-field/text-field.service'
import { LOCALES } from '@constants/locales'
import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { SignInI18nService } from '@pages/sign-in-i18n/sign-in-i18n.service'
import { CreateSignInInput } from '@pages/sign-in/dto/create-sign-in.input'
import { UpdateSignInInput } from '@pages/sign-in/dto/update-sign-in.input'
import { SignInModel } from '@pages/sign-in/entities/sign-in.entity'
import { Repository } from 'typeorm'

@Injectable()
export class SignInService {
  private signInPage: SignInModel

  constructor(
    @InjectRepository(SignInModel) private readonly repo: Repository<SignInModel>,
    @Inject(SignInI18nService) private readonly i18nService: SignInI18nService,
    @Inject(ButtonService) private readonly buttonService: ButtonService,
    @Inject(TextFieldService) private readonly textFieldService: TextFieldService
  ) {
    this.repo
      .find()
      .then((signInPages) => (this.signInPage = signInPages[0]))
      .catch(() => (this.signInPage = null))
  }

  async get(id?: number): Promise<SignInModel> {
    const isNumber = typeof id === 'number'
    try {
      return await this.repo.findOneByOrFail({ id: !isNumber ? this.signInPage?.id : id })
    } catch {
      throw new NotFoundException(
        `${!isNumber ? 'Sign in page not created' : `SignIn with id '${id} not found`}`
      )
    }
  }

  async create({
    title,
    caption,
    usernameTextField,
    passwordTextField,
    button
  }: CreateSignInInput): Promise<SignInModel> {
    if (!this.signInPage) {
      const usernameCreated = await this.textFieldService.create(usernameTextField)
      const passwordCreated = await this.textFieldService.create(passwordTextField)
      const buttonCreated = await this.buttonService.create(button)
      const signIn = await this.repo.save(
        this.repo.create({
          usernameTextField: usernameCreated,
          passwordTextField: passwordCreated,
          button: buttonCreated
        })
      )
      const signInLocale = await this.i18nService.create(signIn, { title, caption })
      this.signInPage = {
        ...signIn,
        title: signInLocale.title,
        caption: signInLocale.caption
      }
    }

    return this.signInPage
  }

  async update(
    id: number,
    {
      title,
      caption,
      usernameTextField,
      passwordTextField,
      button,
      locale = LOCALES.BR
    }: UpdateSignInInput
  ): Promise<SignInModel> {
    let existingIndex = false
    const signIn = await this.get(id)
    const signInLocaleFound = await this.i18nService.getBy({ signIn: { id }, locale })

    const updateUsername = !signIn.usernameTextField
      ? !usernameTextField
        ? null
        : await this.textFieldService.create({ ...usernameTextField })
      : await this.textFieldService.update(signIn.usernameTextField.id, {
          ...usernameTextField,
          locale
        })

    const updatePassword = !signIn.passwordTextField
      ? !passwordTextField
        ? null
        : await this.textFieldService.create({ ...passwordTextField })
      : await this.textFieldService.update(signIn.passwordTextField.id, {
          ...passwordTextField,
          locale
        })

    const updateButton = !signIn?.button
      ? !button
        ? null
        : await this.buttonService.create({ ...button })
      : await this.buttonService.update(signIn.button.id, { ...button, locale })

    if (
      signInLocaleFound?.title &&
      signInLocaleFound?.caption &&
      signInLocaleFound.title === title &&
      signInLocaleFound.caption === caption
    ) {
      existingIndex = true
    }

    const signInLocale = !signInLocaleFound?.title
      ? await this.i18nService.create(signIn, { title, caption, locale })
      : await this.i18nService.update(signIn, { title, caption, locale })

    await this.repo.update(signIn.id, {
      usernameTextField: updateUsername,
      passwordTextField: updatePassword,
      button: updateButton
    })

    return {
      ...signIn,
      title: !existingIndex ? signInLocale.title : title,
      caption: !existingIndex ? signInLocale.caption : caption,
      button: updateButton
    }
  }

  async setImage(filename: string): Promise<void> {
    await this.repo.update(this.signInPage.id, { logo: filename })
  }
}
