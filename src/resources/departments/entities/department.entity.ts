import { ObjectType, Field, Int } from '@nestjs/graphql'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { UserModel } from '@users/entities/user.entity'
import { DepartmentLocaleModel } from 'src/resources/departments-i18n/entities/departments-i18n.entity'

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
  name: string

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
