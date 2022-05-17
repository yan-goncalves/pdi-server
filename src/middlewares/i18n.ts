import { LOCALES } from '@constants/locales'
import { FieldMiddleware, MiddlewareContext } from '@nestjs/graphql'
import { getRepository } from 'typeorm'

type TranslationType = {
  field: string
  inverseField: string
  i18nModel: string
}

const translation = ({ field, inverseField, i18nModel }: TranslationType): FieldMiddleware => {
  return async (ctx: MiddlewareContext) => {
    const locale = ctx.context?.req?.headers?.locale || LOCALES.BR
    const i18nRepo = getRepository(i18nModel)
    const id = +ctx.source?.id
    const foundI18N = await i18nRepo.findOneBy({ [inverseField]: { id }, locale })

    return foundI18N[field]
  }
}

export default translation
