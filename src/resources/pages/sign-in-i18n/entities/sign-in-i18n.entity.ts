import { LOCALES } from '@constants/locales'
import { SignInModel } from '@pages/sign-in/entities/sign-in.entity'
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

@Entity('pages_sign_in_i18n')
@Index(['locale', 'title', 'caption'], { unique: true })
export class SignInLocaleModel {
  @PrimaryGeneratedColumn()
  readonly id: number

  @Column({ enum: LOCALES, default: LOCALES.BR })
  locale: LOCALES

  @ManyToOne(() => SignInModel, (signIn) => signIn.id)
  @JoinColumn({ name: 'id_sign_in' })
  signIn: SignInModel

  @Column({ unique: true })
  title: string

  @Column({ unique: true })
  caption: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
