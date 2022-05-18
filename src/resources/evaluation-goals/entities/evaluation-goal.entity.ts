import { EvaluationGoalKpiModel } from '@evaluation-goals-kpis/entities/evaluation-goal-kpi.entity'
import { EvaluationModel } from '@evaluations/entities/evaluation.entity'
import { GoalModel } from '@goals/entities/goal.entity'
import { Field, Int, ObjectType } from '@nestjs/graphql'
import { UserModel } from '@users/entities/user.entity'
import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

@ObjectType()
@Entity('evaluation_goals')
@Index(['evaluation', 'user', 'goal'], { unique: true })
export class EvaluationGoalModel {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  readonly id: number

  @Field(() => EvaluationModel)
  @ManyToOne(() => EvaluationModel, (evaluation) => evaluation.id, { eager: true })
  @JoinColumn({ name: 'id_evaluation' })
  evaluation: EvaluationModel

  @Field(() => UserModel)
  @ManyToOne(() => UserModel, (user) => user.id, { eager: true })
  @JoinColumn({ name: 'id_user' })
  user: UserModel

  @Field(() => GoalModel)
  @ManyToOne(() => GoalModel, (goal) => goal.id, { eager: true })
  @JoinColumn({ name: 'id_goal' })
  goal: GoalModel

  @Field(() => [EvaluationGoalKpiModel])
  @OneToMany(() => EvaluationGoalKpiModel, (evaluationGoalKpi) => evaluationGoalKpi.kpi)
  @JoinColumn({ name: 'id_kpi' })
  kpis: EvaluationGoalKpiModel[]

  @Field(() => GoalModel)
  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @Field({ nullable: true })
  @DeleteDateColumn({ nullable: true, name: 'deleted_at', default: null })
  deletedAt?: Date
}
