export interface CreateProductDto {
  name: string
  price: number
  stock: number
  active: boolean
  description?: string
}
