import { EVALUATION_PERIOD } from '@constants/evaluations'
import { Field, Int, ObjectType } from '@nestjs/graphql'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

@ObjectType()
export class EvaluationDateModel {
  @Field(() => Date)
  start: Date

  @Field(() => Date)
  deadline: Date
}

@ObjectType()
@Entity('evaluations')
export class EvaluationModel {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  readonly id: number

  @Field(() => Int)
  @Column({ unique: true })
  year: number

  @Field({ defaultValue: EVALUATION_PERIOD.OUT })
  @Column()
  period: EVALUATION_PERIOD

  @Field(() => EvaluationDateModel)
  @Column({
    name: 'mid_date',
    type: String,
    transformer: {
      to: (value: EvaluationDateModel) => JSON.stringify(value),
      from: (value: string) => {
        const mid = JSON.parse(value)
        const start = new Date(mid.start)
        const deadline = new Date(mid.deadline)

        return { start, deadline }
      }
    }
  })
  midDate: EvaluationDateModel

  @Field(() => EvaluationDateModel)
  @Column({
    name: 'end_date',
    type: String,
    transformer: {
      to: (value: EvaluationDateModel) => JSON.stringify(value),
      from: (value: string) => {
        const end = JSON.parse(value)
        const start = new Date(end.start)
        const deadline = new Date(end.deadline)

        return { start, deadline }
      }
    }
  })
  endDate: EvaluationDateModel

  @Field(() => Boolean, { defaultValue: false })
  @Column({ default: false })
  finished: boolean

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
