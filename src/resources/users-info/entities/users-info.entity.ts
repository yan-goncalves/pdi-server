import { ObjectType, Field, Int } from '@nestjs/graphql'
import { BaseEntity } from 'src/resources/common/Base/entities/base.entity'
import { UserModel } from 'src/resources/users/entities/user.entity'
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm'

@ObjectType()
@Entity('users_info')
export class UsersInfoModel extends BaseEntity {
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
}
