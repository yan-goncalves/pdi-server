import { LOCALES } from '@constants/locales'
import { SectionModel } from '@sections/entities/section.entity'
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

@Entity('sections_i18n')
@Index(['locale', 'title'], { unique: true })
export class SectionLocaleModel {
  @PrimaryGeneratedColumn()
  readonly id: number

  @Column({ enum: LOCALES, default: LOCALES.BR })
  locale: LOCALES

  @ManyToOne(() => SectionModel, (section) => section.id)
  @JoinColumn({ name: 'id_section' })
  section: SectionModel

  @Column({ unique: true })
  title: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
