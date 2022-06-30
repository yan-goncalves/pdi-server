import { LOCALES } from '@constants/locales'
import { HomeModel } from '@pages/home/entities/home.entity'
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

@Entity('pages_home_i18n')
@Index(['locale', 'title'], { unique: true })
export class HomeLocaleModel {
  @PrimaryGeneratedColumn()
  readonly id: number

  @Column({ enum: LOCALES, default: LOCALES.BR })
  locale: LOCALES

  @ManyToOne(() => HomeModel, (home) => home.id)
  @JoinColumn({ name: 'id_home' })
  home: HomeModel

  @Column({ unique: true })
  title: string

  @Column({ unique: true })
  description: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
