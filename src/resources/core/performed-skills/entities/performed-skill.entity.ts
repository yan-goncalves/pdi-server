import { AppDataSourceManager } from '@data-source'
import { Field, Int, ObjectType } from '@nestjs/graphql'
import { PerformedEvaluationModel } from '@performed-evaluations/entities/performed-evaluation.entity'
import { RatingModel } from '@ratings/entities/rating.entity'
import { SkillModel } from '@skills/entities/skill.entity'
import {
  AfterInsert,
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
@Entity('performed_skills')
@Index(['performed', 'skill'], { unique: true })
export class PerformedSkillModel {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  readonly id: number

  @Field(() => PerformedEvaluationModel)
  @ManyToOne(() => PerformedEvaluationModel, (performed) => performed.id)
  @JoinColumn({ name: 'id_performed_evaluation' })
  performed: PerformedEvaluationModel

  @Field(() => SkillModel)
  @ManyToOne(() => SkillModel, (skill) => skill.id, { eager: true })
  @JoinColumn({ name: 'id_skill' })
  skill: SkillModel

  @Field(() => RatingModel, { nullable: true })
  @ManyToOne(() => RatingModel, (rating) => rating.id, { nullable: true, eager: true })
  @JoinColumn({ name: 'id_rating_user' })
  ratingUser?: RatingModel

  @Field(() => RatingModel, { nullable: true })
  @ManyToOne(() => RatingModel, (rating) => rating.id, { nullable: true, eager: true })
  @JoinColumn({ name: 'id_rating_manager' })
  ratingManager?: RatingModel

  @Field({ nullable: true })
  @Column({ name: 'mid_feedback_user', length: 3000, nullable: true })
  midFeedbackUser?: string

  @Field({ nullable: true })
  @Column({ name: 'end_feedback_user', length: 3000, nullable: true })
  endFeedbackUser?: string

  @Field({ nullable: true })
  @Column({ name: 'mid_feedback_manager', length: 3000, nullable: true })
  midFeedbackManager?: string

  @Field({ nullable: true })
  @Column({ name: 'end_feedback_manager', length: 3000, nullable: true })
  endFeedbackManager?: string

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @AfterInsert()
  calcGrade(): void {
    AppDataSourceManager.query(`EXEC CalcGrade @PERFORMED = ${this.performed.id}`)
  }
}
