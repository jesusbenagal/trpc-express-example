import { z } from 'zod'

export const createProductSchema = z.object({
  name: z.string({ message: 'Product name is required' }),
  price: z.number({ required_error: 'Product price is required' }),
  stock: z.number({ required_error: 'Product stock is required' }),
  active: z.boolean().optional().default(true),
  description: z.string().optional()
})
