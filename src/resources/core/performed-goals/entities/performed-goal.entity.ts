import { EvaluationGoalModel } from '@evaluations-goals/entities/evaluation-goal.entity'
import { Field, Int, ObjectType } from '@nestjs/graphql'
import { PerformedEvaluationModel } from '@performed-evaluations/entities/performed-evaluation.entity'
import {
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

@ObjectType()
@Entity('performed_goals')
@Index(['performed', 'evaluationGoal'], { unique: true })
export class PerformedGoalModel {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  readonly id: number

  @Field(() => PerformedEvaluationModel)
  @ManyToOne(() => PerformedEvaluationModel, (performed) => performed.id)
  @JoinColumn({ name: 'id_performed_evaluation' })
  performed: PerformedEvaluationModel

  @Field(() => EvaluationGoalModel)
  @ManyToOne(() => EvaluationGoalModel, (evaluationGoal) => evaluationGoal.id, { eager: true })
  @JoinColumn({ name: 'id_evaluation_goal' })
  evaluationGoal: EvaluationGoalModel

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
