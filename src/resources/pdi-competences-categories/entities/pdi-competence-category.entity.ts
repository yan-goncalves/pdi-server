import translation from '@middlewares/i18n'
import { Field, Int, ObjectType } from '@nestjs/graphql'
import { PdiCompetenceCategoryLocaleModel } from '@pdi-competences-categories-i18n/entities/pdi-competence-category-i18n.entity'

import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

@ObjectType()
@Entity('pdi_competences_categories')
export class PdiCompetenceCategoryModel {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  readonly id: number

  @Field({
    nullable: true,
    middleware: [
      translation({
        field: 'name',
        inverseField: 'pdiCompetenceCategory',
        i18nModel: 'PdiCompetenceCategoryLocaleModel'
      })
    ]
  })
  name: string

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @Field({ nullable: true })
  @DeleteDateColumn({ nullable: true, name: 'deleted_at', default: null })
  deletedAt?: Date

  @OneToMany(
    () => PdiCompetenceCategoryLocaleModel,
    (pdiCompetenceCategoryLocale) => pdiCompetenceCategoryLocale.pdiCompetenceCategory
  )
  locale: PdiCompetenceCategoryLocaleModel
}
