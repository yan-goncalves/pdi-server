import { LOCALES } from '@constants/locales'
import { AppDataSource } from '@data-source'
import { FieldMiddleware, MiddlewareContext } from '@nestjs/graphql'

type TranslationType = {
  field: string
  inverseField: string
  i18nModel: string
}

const translation = ({ field, inverseField, i18nModel }: TranslationType): FieldMiddleware => {
  return async (ctx: MiddlewareContext) => {
    const id = +ctx.source?.id
    const locale = ctx.context?.req?.headers?.locale.toUpperCase() || LOCALES.BR
    const i18nRepo = AppDataSource.getRepository(i18nModel)
    const foundI18N = await i18nRepo.findOneBy({ [inverseField]: { id }, locale })

    return foundI18N[field]
  }
}

export default translation
