import { QUESTION_REPLY } from '@constants/performed'
import { Field, Int, ObjectType } from '@nestjs/graphql'
import { PerformedEvaluationModel } from '@performed-evaluations/entities/performed-evaluation.entity'
import { QuestionModel } from '@questions/entities/question.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

@ObjectType()
@Entity('performed_questions')
@Index(['performed', 'question'], { unique: true })
export class PerformedQuestionModel {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  readonly id: number

  @Field(() => PerformedEvaluationModel)
  @ManyToOne(() => PerformedEvaluationModel, (performed) => performed.id)
  @JoinColumn({ name: 'id_performed_evaluation' })
  performed: PerformedEvaluationModel

  @Field(() => QuestionModel)
  @ManyToOne(() => QuestionModel, (question) => question.id, { eager: true })
  @JoinColumn({ name: 'id_question' })
  question: QuestionModel

  @Field({ nullable: true })
  @Column({ nullable: true, enum: QUESTION_REPLY })
  reply?: QUESTION_REPLY

  @Field({ nullable: true })
  @Column({ nullable: true, length: 3000 })
  justification?: string

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
