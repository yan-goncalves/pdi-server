import { TextFieldModel } from '@components/text-field/entities/text-field.entity'
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

@Entity('components_text_field_i18n')
@Index(['locale', 'labelPlaceholder'], { unique: true })
export class TextFieldLocaleModel {
  @PrimaryGeneratedColumn()
  readonly id: number

  @Column({ enum: LOCALES, default: LOCALES.BR })
  locale: LOCALES

  @ManyToOne(() => TextFieldModel, (textField) => textField.id)
  @JoinColumn({ name: 'id_text_field' })
  textField: TextFieldModel

  @Column({ unique: true })
  labelPlaceholder: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
