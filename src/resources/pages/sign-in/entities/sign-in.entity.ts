import { ButtonModel } from '@components/button/entities/button.entity'
import { TextFieldModel } from '@components/text-field/entities/text-field.entity'
import translation from '@middlewares/i18n'
import { Field, Int, ObjectType } from '@nestjs/graphql'
import { SignInLocaleModel } from '@pages/sign-in-i18n/entities/sign-in-i18n.entity'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

@ObjectType()
@Entity('pages_sign_in')
export class SignInModel {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  readonly id: number

  @Field({
    middleware: [
      translation({
        field: 'title',
        inverseField: 'signIn',
        i18nModel: 'SignInLocaleModel'
      })
    ]
  })
  title: string

  @Field({
    middleware: [
      translation({
        field: 'caption',
        inverseField: 'signIn',
        i18nModel: 'SignInLocaleModel'
      })
    ]
  })
  caption: string

  @Field({ nullable: true })
  @Column({ nullable: true, default: null })
  logo: string

  @Field(() => TextFieldModel)
  @OneToOne(() => TextFieldModel, (button) => button.id, { eager: true })
  @JoinColumn({ name: 'id_textfield_username' })
  usernameTextField: TextFieldModel

  @Field(() => TextFieldModel)
  @OneToOne(() => TextFieldModel, (button) => button.id, { eager: true })
  @JoinColumn({ name: 'id_textfield_password' })
  passwordTextField: TextFieldModel

  @Field(() => ButtonModel)
  @OneToOne(() => ButtonModel, (button) => button.id, { eager: true })
  @JoinColumn({ name: 'id_button' })
  button: ButtonModel

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @Field({ nullable: true })
  @DeleteDateColumn({ nullable: true, name: 'deleted_at', default: null })
  deletedAt?: Date

  @OneToMany(() => SignInLocaleModel, (signInLocale) => signInLocale.signIn)
  locale: SignInLocaleModel
}
