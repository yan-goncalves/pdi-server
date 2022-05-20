import { EvaluationModel } from '@evaluations/entities/evaluation.entity'
import { Field, Int, ObjectType } from '@nestjs/graphql'
import { PerformedFeedbackModel } from '@performed-feedbacks/entities/performed-feedback.entity'
import { PerformedGoalModel } from '@performed-goals/entities/performed-goal.entity'
import { PerformedQuestionModel } from '@performed-questions/entities/performed-question.entity'
import { PerformedSkillModel } from '@performed-skills/entities/performed-skill.entity'
import { UserModel } from '@users/entities/user.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

@ObjectType()
@Entity('performed_evaluations')
@Index(['evaluation', 'user'], { unique: true })
export class PerformedEvaluationModel {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  readonly id: number

  @Field(() => EvaluationModel)
  @ManyToOne(() => EvaluationModel, (evaluation) => evaluation.id)
  @JoinColumn({ name: 'id_evaluation' })
  evaluation: EvaluationModel

  @Field(() => UserModel)
  @ManyToOne(() => UserModel, (user) => user.id)
  @JoinColumn({ name: 'id_user' })
  user: UserModel

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  grade?: number

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @Field(() => [PerformedQuestionModel])
  @OneToMany(() => PerformedQuestionModel, (question) => question.performed, { eager: true })
  questions: PerformedQuestionModel[]

  @Field(() => [PerformedSkillModel])
  @OneToMany(() => PerformedSkillModel, (skill) => skill.performed, { eager: true })
  skills: PerformedSkillModel[]

  @Field(() => [PerformedGoalModel])
  @OneToMany(() => PerformedGoalModel, (goal) => goal.performed, { eager: true })
  goals: PerformedGoalModel[]

  @Field(() => [PerformedFeedbackModel])
  @OneToMany(() => PerformedFeedbackModel, (feedback) => feedback.performed, { eager: true })
  feedbacks: PerformedFeedbackModel[]
}
