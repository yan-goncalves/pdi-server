import { ROLES } from '@constants/roles'
import { Field, Int, ObjectType } from '@nestjs/graphql'
import { UsersInfoModel } from '@users-info/entities/users-info.entity'
import { DepartmentModel } from 'src/resources/core/departments/entities/department.entity'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

@ObjectType()
@Entity('users')
@Index(['username', 'email'], { unique: true })
export class UserModel {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  readonly id: number

  @Field(() => UsersInfoModel)
  @OneToOne(() => UsersInfoModel, (info) => info.user, { eager: true })
  @JoinColumn({ name: 'id_info' })
  info: UsersInfoModel

  @Field(() => UserModel, { nullable: true })
  @ManyToOne(() => UserModel, (user) => user.id, { nullable: true })
  @JoinColumn({ name: 'id_manager' })
  manager?: UserModel

  @Field(() => DepartmentModel, { nullable: true })
  @ManyToOne(() => DepartmentModel, (department) => department.id, { nullable: true, eager: true })
  @JoinColumn({ name: 'id_department' })
  department?: DepartmentModel

  @Field()
  @Column({ unique: true })
  readonly username: string

  @Field()
  @Column({ unique: true })
  readonly email: string

  @Field({ defaultValue: ROLES.USER })
  @Column({ enum: ROLES, default: ROLES.USER })
  role: ROLES

  @Column()
  password: string

  @Field({ nullable: true })
  @Column({ nullable: true, name: 'reset_password_token' })
  resetPasswordToken?: string

  @Field({ nullable: true })
  @Column({ nullable: true, name: 'confirmation_token' })
  confirmationToken?: string

  @Field()
  @Column({ default: false })
  confirmed: boolean

  @Field()
  @Column({ default: false })
  blocked: boolean

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
