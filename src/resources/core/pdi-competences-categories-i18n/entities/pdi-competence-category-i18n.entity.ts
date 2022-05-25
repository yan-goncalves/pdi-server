import { LOCALES } from '@constants/locales'
import { PdiCompetenceCategoryModel } from '@pdi-competences-categories/entities/pdi-competence-category.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity('pdi_competences_categories_i18n')
export class PdiCompetenceCategoryLocaleModel {
  @PrimaryGeneratedColumn()
  readonly id: number

  @Column({ enum: LOCALES, default: LOCALES.BR })
  locale: LOCALES

  @ManyToOne(() => PdiCompetenceCategoryModel, (pdiCompetenceCategory) => pdiCompetenceCategory.id)
  @JoinColumn({ name: 'id_pdi_competence_category' })
  pdiCompetenceCategory: PdiCompetenceCategoryModel

  @Column({ unique: true })
  name: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
