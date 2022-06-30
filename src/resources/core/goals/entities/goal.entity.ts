import { EvaluationModel } from '@evaluations/entities/evaluation.entity'
import { KpiModel } from '@kpis/entities/kpi.entity'
import { Field, Int, ObjectType } from '@nestjs/graphql'
import { UserModel } from '@users/entities/user.entity'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

@ObjectType()
@Entity('goals')
@Index(['evaluation', 'manager', 'user', 'name'], { unique: true })
export class GoalModel {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  readonly id: number

  @Field(() => EvaluationModel)
  @ManyToOne(() => EvaluationModel, (evaluation) => evaluation.id, { eager: true })
  @JoinColumn({ name: 'id_evaluation' })
  evaluation: EvaluationModel

  @Field(() => UserModel)
  @ManyToOne(() => UserModel, (manager) => manager.id, { eager: true })
  @JoinColumn({ name: 'id_manager' })
  manager: UserModel

  @Field(() => UserModel)
  @ManyToOne(() => UserModel, (user) => user.id, { eager: true })
  @JoinColumn({ name: 'id_user' })
  user: UserModel

  @Field()
  @Column({
    length: 3000,
    transformer: {
      from: (value: string) => !!value && value.trim(),
      to: (value: string) => !!value && value.trim()
    }
  })
  name: string

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @Field({ nullable: true })
  @DeleteDateColumn({ nullable: true, name: 'deleted_at', default: null })
  deletedAt?: Date

  @Field(() => [KpiModel], { nullable: true })
  @OneToMany(() => KpiModel, (kpi) => kpi.goal, { nullable: true, eager: true })
  kpis?: KpiModel[]
}
