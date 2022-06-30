import { GoalModel } from '@goals/entities/goal.entity'
import { Field, Int, ObjectType } from '@nestjs/graphql'
import { PerformedEvaluationModel } from '@performed-evaluations/entities/performed-evaluation.entity'
import { PerformedGoalKpiModel } from '@performed-goals-kpis/entities/performed-goal-kpi.entity'
import {
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
@Entity('performed_goals')
@Index(['performed', 'goal'], { unique: true })
export class PerformedGoalModel {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  readonly id: number

  @Field(() => PerformedEvaluationModel)
  @ManyToOne(() => PerformedEvaluationModel, (performed) => performed.id)
  @JoinColumn({ name: 'id_performed_evaluation' })
  performed: PerformedEvaluationModel

  @Field(() => GoalModel)
  @ManyToOne(() => GoalModel, (goal) => goal.id, {
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn({ name: 'id_goal' })
  goal: GoalModel

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @Field(() => [PerformedGoalKpiModel], { nullable: true })
  @OneToMany(() => PerformedGoalKpiModel, (goalKpi) => goalKpi.performedGoal, {
    nullable: true,
    eager: true
  })
  performedKpis?: PerformedGoalKpiModel[]
}
