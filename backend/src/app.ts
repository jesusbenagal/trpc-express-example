import { envs, Logger } from './config'
import { MongoAdapter } from './data'
import { AppRoutes } from './presentation/routes'
import { Server } from './presentation/server'

async function main() {
  const logger = new Logger()

  await MongoAdapter.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME
  })

  const server = new Server({
    port: envs.PORT,
    routes: [AppRoutes.routes],
    logger
  })

  server.start()
}

;(async () => {
  main()
})()
