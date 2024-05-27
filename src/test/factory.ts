import app from "@app"
import typeormconn from "@utilities/typeorm.utils"
import { Server as HttpServer } from "http"
import supertest from "supertest"
import Server from "../index"

export class TestFactory {
  private _app: Express.Application
  private _server: HttpServer

  public get app(): supertest.Agent {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return supertest(this._app)
  }

  public get server(): HttpServer {
    return this._server
  }

  /**
   * Connect to DB and start server
   */
  public async init(): Promise<void> {
    await typeormconn.init()
    this._server = Server
    this._app = app
  }

  /**
   * Close server and DB connection
   */
  public async close(): Promise<void> {
    this._server.close()
    await typeormconn.disconnect()
  }
}
