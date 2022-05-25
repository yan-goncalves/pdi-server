import { PDI_QUALITY_CATEGORY } from '@constants/pdi'
import { Field, Int, ObjectType } from '@nestjs/graphql'
import { PerformedEvaluationModel } from '@performed-evaluations/entities/performed-evaluation.entity'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

@ObjectType()
@Entity('pdi_qualities')
export class PdiQualityModel {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  readonly id: number

  @Field(() => PerformedEvaluationModel)
  @ManyToOne(() => PerformedEvaluationModel, (performed) => performed.id)
  @JoinColumn({ name: 'id_performed_evaluation' })
  performed: PerformedEvaluationModel

  @Field()
  @Column({ enum: PDI_QUALITY_CATEGORY })
  category: PDI_QUALITY_CATEGORY

  @Field()
  @Column({ length: 500 })
  description: string

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @Field({ nullable: true })
  @DeleteDateColumn({ nullable: true, name: 'deleted_at', default: null })
  deletedAt?: Date
}
