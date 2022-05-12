import { ObjectType, Field, Int } from '@nestjs/graphql'
import { UserModel } from '@users/entities/user.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

@ObjectType()
@Entity('users_info')
export class UsersInfoModel {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  readonly id: number

  @Field(() => UserModel)
  @OneToOne(() => UserModel, (user) => user.info)
  @JoinColumn({ name: 'id_user' })
  readonly user: UserModel

  @Field()
  @Column()
  name: string

  @Field()
  @Column()
  lastname: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  position?: string

  @Field({ nullable: true })
  @Column({ nullable: true, name: 'hiring_date' })
  hiringDate?: Date

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  badge?: number

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true, name: 'cost_center' })
  costCenter?: number

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
