import { EntitySchema } from 'typeorm'

export const UserEntity = new EntitySchema({
  // Will use table name `post` as default behaviour.
  name: 'User',
  // Optional: Provide `tableName` property to override the default behaviour for table name.
  tableName: 'user',
  columns: {
    id_user: {
      primary: true,
      type: 'varchar',
    },
    name: {
      type: 'varchar',
    },
    email: {
      type: 'varchar',
    },
    password: {
      type: 'varchar',
    },
    link_foto: {
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
