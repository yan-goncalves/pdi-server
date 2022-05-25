import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@ObjectType()
@Entity('media')
export class MediaModel {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  readonly id: number

  @Field()
  @Column()
  filename: string

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
