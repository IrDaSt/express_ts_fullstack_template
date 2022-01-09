import { EntitySchema } from 'typeorm'

const Posts = new EntitySchema({
  // Will use table name `post` as default behaviour.
  name: 'Posts',
  // Optional: Provide `tableName` property to override the default behaviour for table name.
  tableName: 'posts',
  columns: {
    id_post: {
      primary: true,
      type: 'varchar',
    },
    title_post: {
      type: 'varchar',
    },
    description_post: {
      type: 'text',
      nullable: true,
    },
    created_at: {
      type: 'datetime',
      default: new Date(),
    },
    updated_at: {
      type: 'datetime',
      default: new Date(),
    },
  },
})

export default Posts
