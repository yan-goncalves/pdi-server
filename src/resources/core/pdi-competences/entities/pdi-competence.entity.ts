import { Field, Int, ObjectType } from '@nestjs/graphql'
import { PdiCompetenceCategoryModel } from '@pdi-competences-categories/entities/pdi-competence-category.entity'
import { PerformedEvaluationModel } from '@performed-evaluations/entities/performed-evaluation.entity'
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

@ObjectType()
@Entity('pdi_competences')
@Index(['performed', 'category', 'action'], { unique: true })
export class PdiCompetenceModel {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  readonly id: number

  @Field(() => PerformedEvaluationModel)
  @ManyToOne(() => PerformedEvaluationModel, (performed) => performed.id)
  @JoinColumn({ name: 'id_performed_evaluation' })
  performed: PerformedEvaluationModel

  @Field(() => PdiCompetenceCategoryModel)
  @ManyToOne(() => PdiCompetenceCategoryModel, (category) => category.id)
  @JoinColumn({ name: 'id_category' })
  category: PdiCompetenceCategoryModel

  @Field()
  @Column({ length: 500 })
  action: string

  @Field()
  @Column()
  deadline: Date

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
