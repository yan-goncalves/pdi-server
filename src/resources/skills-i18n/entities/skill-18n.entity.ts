import { LOCALES } from '@constants/locales'
import { SkillModel } from '@skills/entities/skill.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity('skills_i18n')
export class SkillLocaleModel {
  @PrimaryGeneratedColumn()
  readonly id: number

  @Column()
  locale: LOCALES

  @ManyToOne(() => SkillModel, (question) => question.id)
  @JoinColumn({ name: 'id_change_me' })
  Skill: SkillModel

  @Column({ unique: true })
  changeMe: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
