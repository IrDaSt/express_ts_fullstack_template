import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm"
import { UserEntity } from "./User.entity"

@Entity("posts")
export class PostsEntity {
  @PrimaryGeneratedColumn("uuid")
  id_post: string

  @Column({ type: "varchar" })
  title_post: string

  @Column({ type: "text", nullable: true })
  description_post?: string

  @Column({ type: "varchar" })
  id_user_post: string

  @Column({ type: "datetime", default: new Date() })
  created_at: Date

  @Column({ type: "datetime", default: new Date() })
  updated_at: Date

  @ManyToOne(() => UserEntity, (user) => user.list_posts)
  @JoinColumn({ name: "id_user_post" })
  user_data?: UserEntity
}
