import translation from '@middlewares/i18n'
import { Field, Int, ObjectType } from '@nestjs/graphql'
import { RatingLocaleModel } from '@ratings-i18n/entities/rating-i18n.entity'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

@ObjectType()
@Entity('ratings')
export class RatingModel {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  readonly id: number

  @Field({
    nullable: true,
    middleware: [
      translation({
        field: 'description',
        inverseField: 'rating',
        i18nModel: 'RatingLocaleModel'
      })
    ]
  })
  description: string

  @Field(() => Int)
  @Column({ unique: true })
  value: number

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @Field({ nullable: true })
  @DeleteDateColumn({ nullable: true, name: 'deleted_at', default: null })
  deletedAt?: Date

  @OneToMany(() => RatingLocaleModel, (ratingLocale) => ratingLocale.rating)
  locale: RatingLocaleModel
}
