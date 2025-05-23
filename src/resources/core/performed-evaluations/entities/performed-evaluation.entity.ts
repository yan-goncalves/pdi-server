import { PdiCoachingModel } from '@core/pdi-coachings/entities/pdi-coaching.entity'
import { PdiCompetenceModel } from '@core/pdi-competences/entities/pdi-competence.entity'
import { PdiQualityModel } from '@core/pdi-qualities/entities/pdi-quality.entity'
import { EvaluationModel } from '@evaluations/entities/evaluation.entity'
import { Field, Float, Int, ObjectType } from '@nestjs/graphql'
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

  @Field(() => Float, { nullable: true })
  @Column({ nullable: true, type: 'float' })
  grade?: number

  @Field(() => Boolean, { defaultValue: false })
  @Column({ name: 'mid_finished', default: false })
  midFinished: boolean

  @Field(() => Boolean, { defaultValue: false })
  @Column({ name: 'end_finished', default: false })
  endFinished: boolean

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @Field(() => [PerformedQuestionModel])
  @OneToMany(() => PerformedQuestionModel, (question) => question.performed)
  questions: PerformedQuestionModel[]

  @Field(() => [PerformedSkillModel])
  @OneToMany(() => PerformedSkillModel, (skill) => skill.performed)
  skills: PerformedSkillModel[]

  @Field(() => [PerformedGoalModel])
  @OneToMany(() => PerformedGoalModel, (goal) => goal.performed)
  goals: PerformedGoalModel[]

  @Field(() => [PerformedFeedbackModel])
  @OneToMany(() => PerformedFeedbackModel, (feedback) => feedback.performed)
  feedbacks: PerformedFeedbackModel[]

  @Field(() => [PdiCoachingModel])
  @OneToMany(() => PdiCoachingModel, (coaching) => coaching.performed)
  pdiCoaching: PdiCoachingModel[]

  @Field(() => [PdiCompetenceModel])
  @OneToMany(() => PdiCompetenceModel, (competence) => competence.performed)
  pdiCompetence: PdiCompetenceModel[]

  @Field(() => [PdiQualityModel])
  @OneToMany(() => PdiQualityModel, (quality) => quality.performed)
  pdiQuality: PdiQualityModel[]
}
