import { createTRPCReact } from '@trpc/react-query'
import { ProductsRouter } from '@cn/trpc-client'

export const trpcProducts = createTRPCReact<ProductsRouter>()
