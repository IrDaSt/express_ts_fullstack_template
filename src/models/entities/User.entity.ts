import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id_user: string

  @Column({ type: 'varchar' })
  name: string

  @Column({ type: 'varchar' })
  email: string

  @Column({ type: 'varchar' })
  password: string

  @Column({ type: 'varchar', nullable: true })
  link_foto?: string

  @Column({ type: 'datetime', default: new Date() })
  created_at: Date

  @Column({ type: 'datetime', default: new Date() })
  updated_at: Date
}
