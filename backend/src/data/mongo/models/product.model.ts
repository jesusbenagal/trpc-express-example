import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  active: {
    type: Boolean,
    default: true
  },
  description: {
    type: String
  }
})

export const ProductModel = mongoose.model('Product', productSchema)
