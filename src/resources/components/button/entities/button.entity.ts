import { ButtonLocaleModel } from '@components/button-i18n/entities/button-i18n.entity'
import translation from '@middlewares/i18n'
import { Field, Int, ObjectType } from '@nestjs/graphql'
import {
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

@ObjectType()
@Entity('button')
export class ButtonModel {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  readonly id: number

  @Field({
    middleware: [
      translation({
        field: 'label',
        inverseField: 'button',
        i18nModel: 'ButtonLocaleModel'
      })
    ]
  })
  label: string

  @Field({
    nullable: true,
    middleware: [
      translation({
        field: 'label',
        inverseField: 'button',
        i18nModel: 'ButtonLocaleModel'
      })
    ]
  })
  loadingLabel?: string

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @OneToMany(() => ButtonLocaleModel, (buttonLocale) => buttonLocale.button)
  locale: ButtonLocaleModel
}
