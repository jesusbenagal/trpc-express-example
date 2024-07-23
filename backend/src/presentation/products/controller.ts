import { Request, Response } from 'express'
import { CustomError, CreateProductDto, UpdateProductDto } from '../../domain'
import { ProductService } from '../services'

export class ProductController {
  constructor(public readonly productService: ProductService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message })
    }

    CustomError.internalServer(`${error}`)
    return res.status(500).json({ error: 'Internal server error' })
  }

  findAll = (req: Request, res: Response) => {
    this.productService
      .findAll()
      .then((products) => res.json(products))
      .catch((error) => this.handleError(error, res))
  }

  findById = (req: Request, res: Response) => {
    const { id } = req.params

    this.productService
      .findOneById(id)
      .then((product) => res.json(product))
      .catch((error) => this.handleError(error, res))
  }

  create = (req: Request, res: Response) => {
    const [error, createProductDto] = CreateProductDto.create(req.body)

    if (error) {
      CustomError.badRequest(error)
      return res.status(400).json({ error })
    }

    this.productService
      .createProduct(createProductDto!)
      .then((product) => res.status(201).json(product))
      .catch((error) => this.handleError(error, res))
  }

  update = (req: Request, res: Response) => {
    const { id } = req.params
    const [error, updateProductDto] = UpdateProductDto.create(req.body)

    if (error) {
      CustomError.badRequest(error)
      return res.status(400).json({ error })
    }

    this.productService
      .updateProduct(id, updateProductDto!)
      .then((product) => res.json(product))
      .catch((error) => this.handleError(error, res))
  }
}
