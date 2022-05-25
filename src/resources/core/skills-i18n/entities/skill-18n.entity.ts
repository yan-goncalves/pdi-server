import { LOCALES } from '@constants/locales'
import { SkillModel } from '@skills/entities/skill.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity('skills_i18n')
@Index(['locale', 'title', 'description'], { unique: true })
export class SkillLocaleModel {
  @PrimaryGeneratedColumn()
  readonly id: number

  @Column({ enum: LOCALES, default: LOCALES.BR })
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
