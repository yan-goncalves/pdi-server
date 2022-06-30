import { ButtonModel } from '@components/button/entities/button.entity'
import translation from '@middlewares/i18n'
import { Field, Int, ObjectType } from '@nestjs/graphql'
import { HomeLocaleModel } from '@pages/home-i18n/entities/home-i18n.entity'
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
@Entity('pages_home')
export class HomeModel {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  readonly id: number

  @Field({
    middleware: [
      translation({
        field: 'title',
        inverseField: 'home',
        i18nModel: 'HomeLocaleModel'
      })
    ]
  })
  title: string

  @Field({
    middleware: [
      translation({
        field: 'description',
        inverseField: 'home',
        i18nModel: 'HomeLocaleModel'
      })
    ]
  })
  description: string

  @Field(() => ButtonModel)
  @OneToOne(() => ButtonModel, (button) => button.id, { eager: true })
  @JoinColumn({ name: 'id_button' })
  button: ButtonModel

  @Field({ nullable: true })
  @Column({ nullable: true, default: null })
  hero: string

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @Field({ nullable: true })
  @DeleteDateColumn({ nullable: true, name: 'deleted_at', default: null })
  deletedAt?: Date

  @OneToMany(() => HomeLocaleModel, (homeLocale) => homeLocale.home)
  locale: HomeLocaleModel
}
