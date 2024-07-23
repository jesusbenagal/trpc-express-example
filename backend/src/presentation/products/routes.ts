import { Router } from 'express'
import { ProductService } from '../services'
import { ProductController } from './controller'

export class ProductRoutes {
  static get routes(): Router {
    const router = Router()

    const productService = new ProductService()

    const controller = new ProductController(productService)

    router.get('/', controller.findAll)
    router.get('/:id', controller.findById)
    router.post('/', controller.create)
    router.put('/:id', controller.update)

    return router
  }
}
