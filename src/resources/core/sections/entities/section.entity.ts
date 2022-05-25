import translation from '@middlewares/i18n'
import { Field, Int, ObjectType } from '@nestjs/graphql'
import { QuestionModel } from '@questions/entities/question.entity'
import { SectionLocaleModel } from '@sections-i18n/entities/sections-i18n.entity'
import { SkillModel } from '@skills/entities/skill.entity'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

@ObjectType()
export class VisibilityModel {
  @Field(() => Boolean)
  USER: boolean

  @Field(() => Boolean)
  MANAGER: boolean

  @Field(() => Boolean)
  COORDINATOR: boolean

  @Field(() => Boolean)
  DIRECTOR: boolean
}

@ObjectType()
@Entity('sections')
export class SectionModel {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  readonly id: number

  @Field({
    middleware: [
      translation({
        field: 'title',
        inverseField: 'section',
        i18nModel: 'SectionLocaleModel'
      })
    ]
  })
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

  @Field(() => [QuestionModel], { nullable: true })
  @ManyToMany(() => QuestionModel, (question) => question.id, { eager: true })
  @JoinTable({
    name: 'sections_questions',
    joinColumn: { name: 'id_section', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'id_question', referencedColumnName: 'id' }
  })
  questions?: QuestionModel[]

  @Field(() => [SkillModel], { nullable: true })
  @ManyToMany(() => SkillModel, (skill) => skill.id, { eager: true })
  @JoinTable({
    name: 'sections_skills',
    joinColumn: { name: 'id_section', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'id_skill', referencedColumnName: 'id' }
  })
  skills?: SkillModel[]

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @Field({ nullable: true })
  @DeleteDateColumn({ nullable: true, name: 'deleted_at', default: null })
  deletedAt?: Date

  @OneToMany(() => SectionLocaleModel, (sectionLocale) => sectionLocale.section)
  locale: SectionLocaleModel
}
