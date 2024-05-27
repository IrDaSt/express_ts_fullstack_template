import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm"

export class CreateTemplatePostsTable1716749443889
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "posts",
        columns: [
          {
            isPrimary: true,
            name: "id_post",
            type: "varchar",
            generationStrategy: "uuid",
          },
          {
            name: "title_post",
            type: "varchar",
          },
          {
            name: "description_post",
            type: "text",
            isNullable: true,
          },
          {
            name: "id_user_post",
            type: "varchar",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "current_timestamp()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "current_timestamp()",
          },
        ],
      }),
    )
    await queryRunner.createIndex(
      "posts",
      new TableIndex({
        name: "id_user_post_index",
        columnNames: ["id_user_post"],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`posts\``)
  }
}
