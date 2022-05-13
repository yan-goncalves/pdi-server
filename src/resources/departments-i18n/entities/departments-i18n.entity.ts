import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { DepartmentModel } from '@departments/entities/department.entity'
import { LOCALES } from '@constants/locales'

@Entity('departments_i18n')
export class DepartmentLocaleModel {
  @PrimaryGeneratedColumn()
  readonly id: number

  @Column()
  locale: LOCALES

  @ManyToOne(() => DepartmentModel, (department) => department.id)
  @JoinColumn({ name: 'id_department' })
  department: DepartmentModel

  @Column({ unique: true })
  readonly name: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
