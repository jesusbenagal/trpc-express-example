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
        onError: ({ error }) => {
          if (error.cause?.name === 'ZodError') {
            const errors = JSON.parse(error.cause.message).map((error: { path: string[]; message: string }) => ({
              path: error.path.join(', '),
              message: error.message
            }))
            logger.error(JSON.stringify(errors))
          } else {
            logger.error(error.message)
          }
        }
      })
    )

    return router
  }
}
