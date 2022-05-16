import { Field, Int, ObjectType } from '@nestjs/graphql'
import { SkillLocaleModel } from '@skills-i18n/entities/skill-18n.entity'
import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

@ObjectType()
@Entity('skills')
export class SkillModel {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  readonly id: number

  @Field({ nullable: true })
  title?: string

  @Field({ nullable: true })
  description?: string

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @Field({ nullable: true })
  @DeleteDateColumn({ nullable: true, name: 'deleted_at', default: null })
  deletedAt?: Date

  @OneToMany(() => SkillLocaleModel, (skillLocale) => skillLocale.skill)
  locale: SkillLocaleModel
}