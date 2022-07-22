import { EVALUATION_RESULT_CONCEPT_COLORS } from '@constants/evaluations'
import { EvaluationResultConceptLocaleModel } from '@evaluation-result-concepts-i18n/entities/evaluation-result-concept-i18n.entity'
import translation from '@middlewares/i18n'
import { Field, Int, ObjectType } from '@nestjs/graphql'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

@ObjectType()
@Entity('evaluation_result_concepts')
@Index(['concept', 'color'], { unique: true })
export class EvaluationResultConceptModel {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  readonly id: number

  @Field()
  @Column({ type: 'char' })
  concept: string

  @Field({
    middleware: [
      translation({
        field: 'description',
        inverseField: 'evaluationResultConcept',
        i18nModel: 'EvaluationResultConceptLocaleModel'
      })
    ]
  })
  description: string

  @Field()
  @Column({ enum: EVALUATION_RESULT_CONCEPT_COLORS })
  color: EVALUATION_RESULT_CONCEPT_COLORS

  @Field()
  @Column({ type: 'float' })
  min: number

  @Field()
  @Column({ type: 'float' })
  max: number

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @Field({ nullable: true })
  @DeleteDateColumn({ nullable: true, name: 'deleted_at', default: null })
  deletedAt?: Date

  @OneToMany(
    () => EvaluationResultConceptLocaleModel,
    (evaluationResultConceptLocale) => evaluationResultConceptLocale.evaluationResultConcept
  )
  locale: EvaluationResultConceptLocaleModel
}
