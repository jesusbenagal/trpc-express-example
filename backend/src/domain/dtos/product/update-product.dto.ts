export class UpdateProductDto {
  private constructor(
    public readonly name?: string,
    public readonly price?: number,
    public readonly stock?: number,
    public readonly active?: boolean,
    public readonly description?: string
  ) {}

  static create(object: { [key: string]: any }): [string?, UpdateProductDto?] {
    const { name, price, stock, active, description } = object

    if (name && typeof name !== 'string') return ['Product name must be a string']
    if (price && typeof price !== 'number') return ['Product price must be a number']
    if (stock && typeof stock !== 'number') return ['Product stock must be a number']
    if (active && typeof active !== 'boolean') return ['Product active must be a boolean']
    if (description && typeof description !== 'string') return ['Product description must be a string']

    return [undefined, new UpdateProductDto(name, price, stock, active, description)]
  }
}
