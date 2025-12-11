import { PerformedEvaluationModel } from '@performed-evaluations/entities/performed-evaluation.entity'
import { UserModel } from '@users/entities/user.entity'
import { Field, Float, Int, ObjectType } from '@nestjs/graphql'
import {
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
@Entity('calibrations')
@Index(['performedEvaluation'], { unique: true })
export class CalibrationModel {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  readonly id: number

  @Field(() => PerformedEvaluationModel)
  @ManyToOne(() => PerformedEvaluationModel, (performed) => performed.calibration)
  @JoinColumn({ name: 'id_performed_evaluation' })
  performedEvaluation: PerformedEvaluationModel

  @Field(() => Float)
  @Column({ name: 'original_grade', type: 'decimal', precision: 4, scale: 2 })
  originalGrade: number

  @Field(() => Float)
  @Column({ name: 'calibration_value', type: 'decimal', precision: 4, scale: 2 })
  calibrationValue: number

  @Field(() => Float)
  @Column({ name: 'final_grade', type: 'decimal', precision: 4, scale: 2 })
  finalGrade: number

  @Field(() => String)
  @Column({ type: 'text' })
  comment: string

  @Field(() => UserModel)
  @ManyToOne(() => UserModel)
  @JoinColumn({ name: 'id_manager' })
  manager: UserModel

  @Field(() => Date)
  @CreateDateColumn({ name: 'created_at' })
  readonly createdAt: Date

  @Field(() => Date)
  @UpdateDateColumn({ name: 'updated_at' })
  readonly updatedAt: Date
}

