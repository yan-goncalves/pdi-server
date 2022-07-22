import { LOCALES } from '@constants/locales'
import { EvaluationResultConceptModel } from '@evaluation-result-concepts/entities/evaluation-result-concept.entity'
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

@Entity('evaluation_result_concepts_i18n')
@Index(['locale', 'description'], { unique: true })
export class EvaluationResultConceptLocaleModel {
  @PrimaryGeneratedColumn()
  readonly id: number

  @Column({ enum: LOCALES, default: LOCALES.BR })
  locale: LOCALES

  @ManyToOne(() => EvaluationResultConceptModel, (evaluationResultConcept) => evaluationResultConcept.id)
  @JoinColumn({ name: 'id_evaluation_result_concept' })
  evaluationResultConcept: EvaluationResultConceptModel

  @Column({ unique: true })
  description: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
