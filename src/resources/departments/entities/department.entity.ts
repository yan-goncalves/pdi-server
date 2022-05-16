import { DepartmentLocaleModel } from '@departments-i18n/entities/department-i18n.entity'
import { Field, Int, ObjectType } from '@nestjs/graphql'
import { UserModel } from '@users/entities/user.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

@ObjectType()
@Entity('departments')
export class DepartmentModel {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  readonly id: number

  @Field()
  @Column({ unique: true })
  readonly key: string

  @Field({ nullable: true })
  name?: string

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @Field(() => [UserModel], { nullable: true })
  @OneToMany(() => UserModel, (user) => user.department, { nullable: true })
  @JoinColumn({ name: 'user' })
  users?: UserModel[]

  @OneToMany(() => DepartmentLocaleModel, (departmentLocale) => departmentLocale.department)
  locale: DepartmentLocaleModel
}
