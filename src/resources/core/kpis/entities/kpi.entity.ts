import { GoalModel } from '@goals/entities/goal.entity'
import { Field, Int, ObjectType } from '@nestjs/graphql'
import { UserModel } from '@users/entities/user.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

@ObjectType()
@Entity('kpis')
@Index(['goal', 'manager', 'name'], { unique: true })
export class KpiModel {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  readonly id: number

  @Field(() => GoalModel)
  @ManyToOne(() => GoalModel, (goal) => goal.id, { onDelete: 'CASCADE' })
  goal: GoalModel

  @Field(() => UserModel)
  @ManyToOne(() => UserModel, (user) => user.id, { eager: true })
  manager: UserModel

  @Field()
  @Column({
    length: 3000,
    transformer: {
      from: (value: string) => !!value && value.trim(),
      to: (value: string) => !!value && value.trim()
    }
  })
  name: string

  @Field()
  @Column({ length: 2000 })
  target: string

  @Field(() => Int)
  @Column()
  weight: number

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
