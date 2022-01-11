import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('user')
export class UserEntity {
  @PrimaryColumn()
  id_user: string

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  password: string

  @Column({ nullable: true })
  link_foto: string

  @Column({ default: new Date() })
  created_at: Date

  @Column({ default: new Date() })
  updated_at: Date
}
