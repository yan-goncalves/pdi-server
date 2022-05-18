import { EvaluationGoalModel } from '@evaluation-goals/entities/evaluation-goal.entity'
import { KpiModel } from '@kpis/entities/kpi.entity'
import { Field, Int, ObjectType } from '@nestjs/graphql'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

@ObjectType()
@Entity('evaluation_goals_kpis')
@Index(['evaluationGoal', 'kpi'], { unique: true })
export class EvaluationGoalKpiModel {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  readonly id: number

  @Field(() => EvaluationGoalModel)
  @ManyToOne(() => EvaluationGoalModel, (evaluationGoalModel) => evaluationGoalModel.id)
  @JoinColumn({ name: 'id_evaluation_goal' })
  evaluationGoal: EvaluationGoalModel

  @Field(() => KpiModel)
  @ManyToOne(() => KpiModel, (kpi) => kpi.id, { eager: true })
  @JoinColumn({ name: 'id_kpi' })
  kpi: KpiModel

  @Field()
  @Column({ length: 2000 })
  target: string

  @Field(() => Int)
  @Column()
  weight: number

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
