import { LOCALES } from '@constants/locales'
import { FeedbackModel } from '@feedbacks/entities/feedback.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity('feedbacks_i18n')
export class FeedbackLocaleModel {
  @PrimaryGeneratedColumn()
  readonly id: number

  @Column()
  locale: LOCALES

  @ManyToOne(() => FeedbackModel, (feedback) => feedback.id)
  @JoinColumn({ name: 'id_feedback' })
  feedback: FeedbackModel

  @Column({ unique: true })
  inquire: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
