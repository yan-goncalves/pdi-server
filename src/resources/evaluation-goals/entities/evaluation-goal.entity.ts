import { EvaluationModel } from '@evaluations/entities/evaluation.entity'
import { GoalModel } from '@goals/entities/goal.entity'
import { KpiModel } from '@kpis/entities/kpi.entity'
import { Field, ObjectType } from '@nestjs/graphql'
import { UserModel } from '@users/entities/user.entity'
import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm'

@ObjectType()
@Entity('evaluation_goals')
export class EvaluationGoalModel {
  @Field(() => EvaluationModel)
  @PrimaryColumn('int')
  @ManyToOne(() => EvaluationModel, (evaluation) => evaluation.goals)
  @JoinColumn({ name: 'id_evaluation' })
  evaluation: EvaluationModel

  @Field(() => UserModel)
  @PrimaryColumn('int')
  @ManyToOne(() => UserModel)
  @JoinColumn({ name: 'id_user' })
  user: UserModel

  @Field(() => GoalModel)
  @PrimaryColumn('int')
  @ManyToOne(() => GoalModel)
  @JoinColumn({ name: 'id_goal' })
  goal: GoalModel

  @Field(() => [KpiModel])
  @ManyToMany(() => KpiModel)
  @JoinTable({
    name: 'evaluation_goals_kpis',
    joinColumns: [
      { name: 'id_evaluation_goal_evaluation', referencedColumnName: 'evaluation' },
      { name: 'id_evaluation_goal_user', referencedColumnName: 'user' },
      { name: 'id_evaluation_goal_goal', referencedColumnName: 'goal' }
    ],
    inverseJoinColumns: [{ name: 'id_kpi', referencedColumnName: 'id' }]
  })
  kpis: KpiModel[]

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
