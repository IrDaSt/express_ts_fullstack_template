import TemplateEntities from "../../models/entities/entities"
import dotenv from "dotenv"
dotenv.config({
  path: ".env",
})
import { DataSource } from "typeorm"

const configDatabaseTemplate = new DataSource({
  type: "mariadb",
  host: process.env.TEMPLATE_DB_HOST ?? "localhost",
  username: process.env.TEMPLATE_DB_USER ?? "root",
  port: Number(process.env.TEMPLATE_DB_PORT ?? 3306),
  password: process.env.TEMPLATE_DB_PASSWORD ?? "",
  database: process.env.TEMPLATE_DB_NAME ?? "express_rest_api",
  // cache: {
  //   type: "redis",
  //   options: {
  //     host: "localhost",
  //     port: 6379,
  //   },
  // },
  entities: TemplateEntities,
  // Make sure to make migration line below like this
  // migrations: ["./src/database/migration/template/*.ts"],
})

export default configDatabaseTemplate
