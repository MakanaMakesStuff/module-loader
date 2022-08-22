import glob from "glob"
import * as dotenv from "dotenv"
dotenv.config()
import BaseModule from "./Base"
import { DataSource } from "typeorm"
import { createConnection } from "mysql2"

class ServerModule extends BaseModule {
  namespace: string = "Server"

  async init() {
    console.log("Server module initialized")
    await this.serverConnection()
  }

  async serverConnection() {
    try {
      const connection = createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
      })

      const sql = `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`

      connection.query(sql, (error) => {
        if (error) {
          console.error("Error creating database ", error)
        } else {
          console.log("Database created!")
          this.ormConnection()
        }
      })
    } catch (error) {
      console.error("Error connecting to server ", error)
    }
  }

  async ormConnection() {
    try {
      const port = parseInt(process.env.DB_PORT!) || 3306

      const models = glob.sync("**/models/*.ts", {
        ignore: ["**/models/Base.ts"],
      })

      const entities = await Promise.all(
        Object.values(models).map((entity) =>
          import(entity).then((module) => module.default)
        )
      )

      const connection = new DataSource({
        type: "mysql",
        host: process.env.DB_HOST,
        port: port,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        entities,
        synchronize: true,
        logger: "debug",
      })

      await connection.initialize()

      console.log("Database connected!")
    } catch (error) {
      console.error("Error connecting to database ", error)
    }
  }
}

declare namespace ServerModule {}

export default ServerModule
