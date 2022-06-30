import { KpiModel } from '@kpis/entities/kpi.entity'
import { Field, Int, ObjectType } from '@nestjs/graphql'
import { PerformedGoalModel } from '@performed-goals/entities/performed-goal.entity'
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

  @Field(() => PerformedGoalModel)
  @ManyToOne(() => PerformedGoalModel, (performed) => performed.id)
  @JoinColumn({ name: 'id_performed_goal' })
  performedGoal: PerformedGoalModel

  @Field(() => KpiModel)
  @ManyToOne(() => KpiModel, (kpi) => kpi.id, {
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn({ name: 'id_kpi' })
  kpi: KpiModel

  @Field(() => RatingModel, { nullable: true })
  @ManyToOne(() => RatingModel, (rating) => rating.id, { eager: true, nullable: true })
  @JoinColumn({ name: 'id_rating_manager' })
  ratingManager?: RatingModel

  @Field({ nullable: true })
  @Column({ length: 2000, nullable: true })
  achieved?: string

  @Field({ nullable: true })
  @Column({ length: 3000, nullable: true, name: 'mid_feedback_user' })
  midFeedbackUser?: string

  @Field({ nullable: true })
  @Column({ length: 3000, nullable: true, name: 'end_feedback_user' })
  endFeedbackUser?: string

  @Field({ nullable: true })
  @Column({ length: 3000, nullable: true, name: 'mid_feedback_manager' })
  midFeedbackManager?: string

  @Field({ nullable: true })
  @Column({ length: 3000, nullable: true, name: 'end_feedback_manager' })
  endFeedbackManager?: string

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
