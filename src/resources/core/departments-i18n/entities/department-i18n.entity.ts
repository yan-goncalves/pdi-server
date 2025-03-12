import { LOCALES } from '@constants/locales'
import { DepartmentModel } from '@departments/entities/department.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity('departments_i18n')
export class DepartmentLocaleModel {
  @PrimaryGeneratedColumn()
  readonly id: number

  @Column({ enum: LOCALES, default: LOCALES.BR })
  locale: LOCALES

  @ManyToOne(() => DepartmentModel, (department) => department.id)
  @JoinColumn({ name: 'id_department' })
  department: DepartmentModel

  @Column()
  name: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
