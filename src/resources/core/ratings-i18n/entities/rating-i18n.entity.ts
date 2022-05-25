import { LOCALES } from '@constants/locales'
import { RatingModel } from '@ratings/entities/rating.entity'
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

@Entity('ratings_i18n')
@Index(['locale', 'description'], { unique: true })
export class RatingLocaleModel {
  @PrimaryGeneratedColumn()
  readonly id: number

  @Column({ enum: LOCALES, default: LOCALES.BR })
  locale: LOCALES

  @ManyToOne(() => RatingModel, (rating) => rating.id)
  @JoinColumn({ name: 'id_rating' })
  rating: RatingModel

  @Column({ unique: true })
  description: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
