import { ProductService } from '../services'
import { CustomError, CreateProductDto } from '../../domain'

export class ProductController {
  constructor(public readonly productService: ProductService) {}

  async getAll() {
    try {
      return await this.productService.getAll()
    } catch (error) {
      this.handleError(error)
    }
  }

  async getById(input: { id: string }) {
    const { id } = input
    try {
      return await this.productService.getById(id)
    } catch (error) {
      this.handleError(error)
    }
  }

  async create(input: CreateProductDto) {
    try {
      return await this.productService.createProduct(input)
    } catch (error) {
      this.handleError(error)
    }
  }

  async update(input: { id: string; data: Partial<CreateProductDto> }) {
    const { id, data } = input

    try {
      return await this.productService.updateProduct(id, data)
    } catch (error) {
      this.handleError(error)
    }
  }

  private handleError(error: unknown) {
    if (error instanceof CustomError) {
      throw error
    }
    throw CustomError.internalServer(`${error}`)
  }
}
