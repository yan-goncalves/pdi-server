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
export class VisibilityModel {
  @Field(() => Boolean)
  User: boolean

  @Field(() => Boolean)
  Manager: boolean

  @Field(() => Boolean)
  Coordinator: boolean

  @Field(() => Boolean)
  Director: boolean
}

@ObjectType()
@Entity('sections')
export class SectionModel {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  readonly id: number

  @Field({ nullable: true })
  title: string

  @Field(() => VisibilityModel)
  @Column({
    type: String,
    transformer: {
      to: (value: VisibilityModel) => JSON.stringify(value),
      from: (value: string) => JSON.parse(value)
    }
  })
  visibility: VisibilityModel

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
