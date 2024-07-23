import { ProductModel } from '../../data'
import { CustomError, ProductEntity, CreateProductDto } from '../../domain'
import { Uuid } from '../../config'

export class ProductService {
  public async getAll(): Promise<ProductEntity[]> {
    const products = await ProductModel.find()

    const productsEntity = products.map((product) => ProductEntity.fromObject(product))

    return productsEntity
  }

  public async getById(id: string): Promise<ProductEntity> {
    const product = await ProductModel.findOne({ id })

    if (!product) throw CustomError.notFound('Product not found')

    return ProductEntity.fromObject(product)
  }

  public async createProduct(createProductDto: CreateProductDto): Promise<ProductEntity> {
    const existsProduct = await ProductModel.findOne({ name: createProductDto.name })

    if (existsProduct) throw CustomError.badRequest('Product already exists')

    try {
      const product = new ProductModel({ id: Uuid.generate(), ...createProductDto })

      await product.save()

      const productEntity = ProductEntity.fromObject(product)

      return productEntity
    } catch (error) {
      throw CustomError.internalServer(`${error}`)
    }
  }

  public async updateProduct(id: string, updateProductDto: Partial<CreateProductDto>): Promise<ProductEntity> {
    try {
      const product = await ProductModel.findOneAndUpdate({ id }, updateProductDto, { new: true })

      if (!product) throw CustomError.notFound('Product not found')

      const productEntity = ProductEntity.fromObject(product)

      return productEntity
    } catch (error) {
      throw CustomError.internalServer(`${error}`)
    }
  }
}
