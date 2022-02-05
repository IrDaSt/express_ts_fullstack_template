import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('posts')
export class PostsEntity {
  @PrimaryGeneratedColumn('uuid')
  id_post: string

  @Column({ type: 'varchar' })
  title_post: string

  @Column({ type: 'text', nullable: true })
  description_post?: string

  @Column({ type: 'datetime', default: new Date() })
  created_at: Date

  @Column({ type: 'datetime', default: new Date() })
  updated_at: Date
}
