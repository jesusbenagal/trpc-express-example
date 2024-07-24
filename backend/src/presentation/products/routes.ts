import { initTRPC } from '@trpc/server'
import { z } from 'zod'
import { ProductController } from './controller'
import { ProductService } from '../services'
import { createProductSchema } from '../../domain/'

const t = initTRPC.create()
const productController = new ProductController(new ProductService())

export const productsRouter = t.router({
  getAll: t.procedure.query(() => productController.getAll()),
  getById: t.procedure.input(z.object({ id: z.string() })).query(({ input }) => productController.getById(input)),
  createProduct: t.procedure.input(createProductSchema).mutation(({ input }) => productController.create(input)),
  updateProduct: t.procedure
    .input(
      z.object({
        id: z.string(),
        data: createProductSchema.partial()
      })
    )
    .mutation(({ input }) => productController.update(input))
})

export type ProductsRouter = typeof productsRouter
