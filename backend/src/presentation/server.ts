import express, { Router } from 'express'
import cors from 'cors'
import path from 'path'
import { Logger } from '../config'

interface Options {
  port: number
  routes: Router[]
  publicPath?: string
  logger: Logger
}

export class Server {
  public readonly app = express()
  private serverListener?: any
  private readonly port: number
  private readonly routes: Router[]
  private readonly publicPath: string
  private readonly logger: Logger

  constructor(options: Options) {
    const { port, routes, publicPath } = options
    this.port = port
    this.routes = routes
    this.publicPath = publicPath || path.join(__dirname, 'public')
    this.logger = options.logger
  }

  async start(): Promise<void> {
    // Middlewares
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(cors())

    // Public Folders
    this.app.use(express.static(this.publicPath))

    // Routes
    this.routes.forEach((route) => {
      this.app.use(route)
    })

    this.serverListener = this.app.listen(this.port, () => {
      this.logger.info(`Server listening on port ${this.port}`)
    })
  }

  public close(): void {
    this.serverListener?.close()
  }
}
