import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm"
import { PostsEntity } from "./Posts.entity"

@Entity("user")
export class UserEntity {
  @PrimaryGeneratedColumn("uuid")
  id_user: string

  @Column({ type: "varchar" })
  name: string

  @Column({ type: "varchar" })
  email: string

  @Column({ type: "varchar" })
  password: string

  @Column({ type: "varchar", nullable: true })
  link_foto?: string

  @Column({ type: "datetime", default: new Date() })
  created_at: Date

  @Column({ type: "datetime", default: new Date() })
  updated_at: Date

  @OneToMany(() => PostsEntity, (posts) => posts.user_data)
  @JoinColumn({ name: "id_user" })
  list_posts?: PostsEntity[]
}
