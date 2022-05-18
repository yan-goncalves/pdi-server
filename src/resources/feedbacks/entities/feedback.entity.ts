import { FeedbackLocaleModel } from '@feedbacks-i18n/entities/feedback-i18n.entity'
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
@Entity('feedbacks')
export class FeedbackModel {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  readonly id: number

  @Field({
    nullable: true,
    middleware: [
      translation({
        field: 'inquire',
        inverseField: 'feedback',
        i18nModel: 'FeedbackLocaleModel'
      })
    ]
  })
  inquire: string

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @Field({ nullable: true })
  @DeleteDateColumn({ nullable: true, name: 'deleted_at', default: null })
  deletedAt?: Date

  @OneToMany(() => FeedbackLocaleModel, (feedbackLocale) => feedbackLocale.feedback)
  locale: FeedbackLocaleModel
}
