import { Field, Int, ObjectType } from '@nestjs/graphql'
import { QuestionLocaleModel } from '@questions-i18n/entities/questions-i18n.entity'
import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

@ObjectType()
@Entity('questions')
export class QuestionModel {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  readonly id: number

  @Field({ nullable: true })
  ask?: string

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @Field({ nullable: true })
  @DeleteDateColumn({ nullable: true, name: 'deleted_at', default: null })
  deletedAt?: Date

  @OneToMany(() => QuestionLocaleModel, (questionLocale) => questionLocale.question)
  locale: QuestionLocaleModel
}
