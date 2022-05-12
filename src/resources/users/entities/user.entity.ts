import { ObjectType, Field, Int } from '@nestjs/graphql'
import { hashSync } from 'bcrypt'
import { ROLES } from 'src/constants/roles'
import { UsersInfoModel } from 'src/resources/users-info/entities/users-info.entity'
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

@ObjectType()
@Entity('users')
export class UserModel {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  readonly id: number

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
  @DeleteDateColumn({ nullable: true, name: 'deleted_at', default: null })
  deletedAt?: Date

  @BeforeInsert()
  setDefaultPassword = (): void => {
    const password = process.env.DEFAULT_PASSWORD || 'sl123456!'
    const salt = +process.env.SALT_GEN || 10
    this.password = hashSync(password, salt)
  }

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @Field(() => UsersInfoModel)
  @OneToOne(() => UsersInfoModel, (info) => info.user, { eager: true })
  @JoinColumn({ name: 'id_info' })
  info: UsersInfoModel
}
