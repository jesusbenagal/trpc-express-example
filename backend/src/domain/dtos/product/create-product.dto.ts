export class CreateProductDto {
  private constructor(
    public readonly name: string,
    public readonly price: number,
    public readonly stock: number,
    public readonly active: boolean = true,
    public readonly description?: string
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateProductDto?] {
    const { name, price, stock, active, description } = object

    if (!name) return ['Product name is required']
    if (name && typeof name !== 'string') return ['Product name must be a string']
    if (!price) return ['Product price is required']
    if (price && typeof price !== 'number') return ['Product price must be a number']
    if (!stock) return ['Product stock is required']
    if (stock && typeof stock !== 'number') return ['Product stock must be a number']
    if (active && typeof active !== 'boolean') return ['Product active must be a boolean']
    if (description && typeof description !== 'string') return ['Product description must be a string']

    return [undefined, new CreateProductDto(name, price, stock, active, description)]
  }
}
