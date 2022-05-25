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
@Index(['manager', 'name'], { unique: true })
export class KpiModel {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  readonly id: number

  @Field(() => UserModel)
  @ManyToOne(() => UserModel, (user) => user.id)
  manager: UserModel

  @Field()
  @Column({ length: 3000 })
  name: string

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
