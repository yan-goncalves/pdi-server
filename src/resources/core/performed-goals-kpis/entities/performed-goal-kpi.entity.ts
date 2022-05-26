import { EvaluationGoalKpiModel } from '@evaluations-goals-kpis/entities/evaluation-goal-kpi.entity'
import { Field, Int, ObjectType } from '@nestjs/graphql'
import { PerformedEvaluationModel } from '@performed-evaluations/entities/performed-evaluation.entity'
import { RatingModel } from '@ratings/entities/rating.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

@ObjectType()
@Entity('performed_goals_kpis')
export class PerformedGoalKpiModel {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  readonly id: number

  @Field(() => PerformedEvaluationModel)
  @ManyToOne(() => PerformedEvaluationModel, (performed) => performed.id)
  @JoinColumn({ name: 'id_performed_evaluation' })
  performed: PerformedEvaluationModel

  @Field(() => EvaluationGoalKpiModel)
  @ManyToOne(() => EvaluationGoalKpiModel, (evaluationGoalKpi) => evaluationGoalKpi.id)
  @JoinColumn({ name: 'id_evaluation_goal_kpi' })
  evaluationGoalKpi: EvaluationGoalKpiModel

  @Field(() => RatingModel)
  @ManyToOne(() => RatingModel, (rating) => rating.id)
  @JoinColumn({ name: 'id_rating_manager' })
  ratingManager: RatingModel

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  achieved?: number

  @Field({ nullable: true })
  @Column({ length: 3000, nullable: true })
  midFeedbackUser?: string

  @Field({ nullable: true })
  @Column({ length: 3000, nullable: true })
  midFeedbackManager?: string

  @Field({ nullable: true })
  @Column({ length: 3000, nullable: true })
  endFeedbackManager?: string

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
