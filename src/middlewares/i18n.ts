import { LOCALES } from '@constants/locales'
import { FieldMiddleware, MiddlewareContext, NextFn } from '@nestjs/graphql'
import { ArgumentNode } from 'graphql'
import { getRepository } from 'typeorm'

const translation: FieldMiddleware = async (ctx: MiddlewareContext, next: NextFn) => {
  const repo = getRepository(ctx.info.parentType.name)
  const found = await repo.findOneBy({ id: +ctx.source?.id })
  const selections = ctx.info.operation.selectionSet.selections
  const args = selections[0]?.['arguments'] as ReadonlyArray<ArgumentNode>
  const locale = args.find((arg) => arg.name.value === 'locale') || LOCALES.BR
  const split = ctx.info.parentType.name.split(/model/i)
  const i18n = `${split[0]}LocaleModel`
  const repoI18N = getRepository(i18n)
  const foundI18N = await repoI18N.findOneBy({ locale: LOCALES.EN })

  console.log('--------------- ctx ---------------', repo?.['target'])
  // const value = await next()
  // console.log(value)
  return await next()
}

export default translation
