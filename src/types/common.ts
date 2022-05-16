import { LOCALES } from '@constants/locales'
import { FindOptionsRelations } from 'typeorm'

export type EntityFindOptions<T> = {
  locale?: LOCALES
  relations?: FindOptionsRelations<T>
}
