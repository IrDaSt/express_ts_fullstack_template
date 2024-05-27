import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateTemplateUserTable1716749898511
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "user",
        columns: [
          {
            isPrimary: true,
            name: "id_user",
            type: "varchar",
            generationStrategy: "uuid",
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "email",
            type: "varchar",
          },
          {
            name: "password",
            type: "varchar",
          },
          {
            name: "link_foto",
            type: "varchar",
            isNullable: true,
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`user\``)
  }
}
