import { ButtonModel } from '@components/button/entities/button.entity'
import { LOCALES } from '@constants/locales'
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

@Entity('button_i18n')
@Index(['locale', 'label', 'loadingLabel'], { unique: true })
export class ButtonLocaleModel {
  @PrimaryGeneratedColumn()
  readonly id: number

  @Column({ enum: LOCALES, default: LOCALES.BR })
  locale: LOCALES

  @ManyToOne(() => ButtonModel, (button) => button.id)
  @JoinColumn({ name: 'id_button' })
  button: ButtonModel

  @Column({ unique: true })
  label: string

  @Column({ nullable: true })
  loadingLabel?: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
