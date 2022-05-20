import { FeedbackModel } from '@feedbacks/entities/feedback.entity'
import { Field, Int, ObjectType } from '@nestjs/graphql'
import { PerformedEvaluationModel } from '@performed-evaluations/entities/performed-evaluation.entity'
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
@Entity('performed_feedbacks')
@Index(['performed', 'feedback'], { unique: true })
export class PerformedFeedbackModel {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  readonly id: number

  @Field(() => PerformedEvaluationModel)
  @ManyToOne(() => PerformedEvaluationModel, (performed) => performed.id)
  @JoinColumn({ name: 'id_performed_evaluation' })
  performed: PerformedEvaluationModel

  @Field(() => FeedbackModel)
  @ManyToOne(() => FeedbackModel, (feedback) => feedback.id)
  @JoinColumn({ name: 'id_feedback' })
  feedback: FeedbackModel

  @Field({ nullable: true })
  @Column({ name: 'mid_reply', length: 5000, nullable: true })
  midReply?: string

  @Field({ nullable: true })
  @Column({ name: 'end_reply', length: 5000, nullable: true })
  endReply?: string

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
