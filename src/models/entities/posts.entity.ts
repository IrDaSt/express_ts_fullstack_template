import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('posts')
export class PostsEntity {
  @PrimaryGeneratedColumn('uuid')
  id_post: string

  @Column()
  title_post: string

  @Column({ nullable: true })
  description_post: string

  @Column({ default: new Date() })
  created_at: Date

  @Column({ default: new Date() })
  updated_at: Date
}
