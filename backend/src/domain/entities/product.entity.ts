import { CustomError } from '../errors/custom.error'

export class ProductEntity {
  constructor(
    public id: string,
    public name: string,
    public price: number,
    public stock: number,
    public active: boolean = true,
    public description?: string
  ) {}

  static fromObject(object: { [key: string]: any }) {
    const { id, _id, name, price, stock, active, description } = object

    if (!id && !_id) throw CustomError.badRequest('Product id is required')

    if (!name) throw CustomError.badRequest('Product name is required')
    if (!price) throw CustomError.badRequest('Product price is required')
    if (!stock) throw CustomError.badRequest('Product stock is required')

    return new ProductEntity(id || _id, name, price, stock, active, description)
  }
}
