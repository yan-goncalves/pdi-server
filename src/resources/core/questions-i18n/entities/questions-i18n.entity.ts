import { LOCALES } from '@constants/locales'
import { QuestionModel } from '@questions/entities/question.entity'
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

@Entity('questions_i18n')
@Index(['locale', 'ask'], { unique: true })
export class QuestionLocaleModel {
  @PrimaryGeneratedColumn()
  readonly id: number

  @Column({ enum: LOCALES, default: LOCALES.BR })
  locale: LOCALES

  @ManyToOne(() => QuestionModel, (question) => question.id)
  @JoinColumn({ name: 'id_question' })
  question: QuestionModel

  @Column({ unique: true })
  ask: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
