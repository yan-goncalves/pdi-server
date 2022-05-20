import { ButtonModel } from '@components/button/entities/button.entity'
import { MediaModel } from '@medias/entities/media.entity'
import translation from '@middlewares/i18n'
import { Field, Int, ObjectType } from '@nestjs/graphql'
import { HomeLocaleModel } from '@pages/home-i18n/entities/home-i18n.entity'
import {
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
@Entity('home')
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

  @Field(() => MediaModel)
  @OneToOne(() => MediaModel, (media) => media.id, { eager: true })
  @JoinColumn({ name: 'id_media' })
  hero: MediaModel

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

  @OneToMany(() => HomeLocaleModel, (homeLocale) => homeLocale.home)
  locale: HomeLocaleModel
}
