import {
  EVALUATION_APPROVAL_PERIOD,
  EVALUATION_APPROVAL_STATUS
} from '@constants/evaluation-approval'
import { Field, Int, ObjectType } from '@nestjs/graphql'
import { PerformedEvaluationModel } from '@performed-evaluations/entities/performed-evaluation.entity'
import { UserModel } from '@users/entities/user.entity'
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
@Entity('evaluation_approvals')
@Index(['performedEvaluation', 'period'], { unique: true })
export class EvaluationApprovalModel {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  readonly id: number

  @Field(() => PerformedEvaluationModel)
  @ManyToOne(() => PerformedEvaluationModel, (performed) => performed.approvals)
  @JoinColumn({ name: 'id_performed_evaluation' })
  performedEvaluation: PerformedEvaluationModel

  @Field(() => String)
  @Column({ enum: EVALUATION_APPROVAL_PERIOD })
  period: EVALUATION_APPROVAL_PERIOD

  @Field(() => String, { defaultValue: EVALUATION_APPROVAL_STATUS.PENDING })
  @Column({ enum: EVALUATION_APPROVAL_STATUS, default: EVALUATION_APPROVAL_STATUS.PENDING })
  status: EVALUATION_APPROVAL_STATUS

  @Field(() => UserModel, { nullable: true })
  @ManyToOne(() => UserModel, (user) => user.id, { nullable: true })
  @JoinColumn({ name: 'id_hr_user' })
  hrUser?: UserModel

  @Field({ nullable: true })
  @Column({ nullable: true, type: 'text' })
  comment?: string

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}

