import { Router } from 'express'
import { createExpressMiddleware } from '@trpc/server/adapters/express'
import { productsRouter } from './products/routes'
import { Logger } from '../config'

export class AppRoutes {
  static get routes(): Router {
    const router = Router()
    const logger = new Logger()

    router.use(
      '/api/products',
      createExpressMiddleware({
        router: productsRouter,
        createContext: () => ({}),
        onError({ error }) {
          logger.error(error.message)
        }
      })
    )

    return router
  }
}
