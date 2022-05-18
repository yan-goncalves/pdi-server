import { EvaluationModel } from '@evaluations/entities/evaluation.entity'
import { Field, Int, ObjectType } from '@nestjs/graphql'
import { UserModel } from '@users/entities/user.entity'
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
@Entity('performed_evaluations')
@Index(['evaluation', 'user'], { unique: true })
export class PerformedEvaluationModel {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  readonly id: number

  @Field(() => EvaluationModel)
  @ManyToOne(() => EvaluationModel, (evaluation) => evaluation.id)
  @JoinColumn({ name: 'id_evaluation' })
  evaluation: EvaluationModel

  @Field(() => UserModel)
  @ManyToOne(() => UserModel, (user) => user.id)
  @JoinColumn({ name: 'id_user' })
  user: UserModel

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
