import uuidHelper from '@utilities/uuid'
import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('posts')
export class PostsEntity {
  @PrimaryColumn({ default: () => uuidHelper.generateUUIDV4() })
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
