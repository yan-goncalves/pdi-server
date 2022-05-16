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
  @JoinColumn({ name: 'id_skill' })
  skill: SkillModel

  @Column({ length: 500 })
  title: string

  @Column({ unique: true, length: 1500 })
  description: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
