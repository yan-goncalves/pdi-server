import { LOCALES } from '@constants/locales'
import { SectionModel } from '@sections/entities/section.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity('sections_i18n')
export class SectionLocaleModel {
  @PrimaryGeneratedColumn()
  readonly id: number

  @Column()
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
