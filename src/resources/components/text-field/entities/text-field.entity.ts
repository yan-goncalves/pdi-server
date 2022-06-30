import { TextFieldLocaleModel } from '@components/text-field-i18n/entities/text-field-i18n.entity'
import translation from '@middlewares/i18n'
import { Field, Int, ObjectType } from '@nestjs/graphql'
import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

@ObjectType()
@Entity('components_text_field')
export class TextFieldModel {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  readonly id: number

  @Field({
    middleware: [
      translation({
        field: 'labelPlaceholder',
        inverseField: 'textField',
        i18nModel: 'TextFieldLocaleModel'
      })
    ]
  })
  labelPlaceholder: string

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @Field({ nullable: true })
  @DeleteDateColumn({ nullable: true, name: 'deleted_at', default: null })
  deletedAt?: Date

  @OneToMany(() => TextFieldLocaleModel, (textFieldLocale) => textFieldLocale.textField)
  locale: TextFieldLocaleModel
}
