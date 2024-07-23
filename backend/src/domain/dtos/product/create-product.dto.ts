import { createProductSchema } from '../../schemas/product.schema'

export class CreateProductDto {
  private constructor(
    public readonly name: string,
    public readonly price: number,
    public readonly stock: number,
    public readonly active: boolean = true,
    public readonly description?: string
  ) {}

  static create(object: unknown): [string?, CreateProductDto?] {
    const parseResult = createProductSchema.safeParse(object)

    if (!parseResult.success) {
      const errors = parseResult.error.errors.map((err) => err.message).join(', ')
      return [errors]
    }

    const { name, price, stock, active, description } = parseResult.data
    return [undefined, new CreateProductDto(name, price, stock, active, description)]
  }
}
