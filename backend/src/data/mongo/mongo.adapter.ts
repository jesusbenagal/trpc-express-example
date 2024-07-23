import mongoose from 'mongoose'

interface Options {
  mongoUrl: string
  dbName: string
}

export class MongoAdapter {
  static async connect(options: Options) {
    const { mongoUrl, dbName } = options

    try {
      await mongoose.connect(mongoUrl, {
        dbName
      })

      return true
    } catch (error) {
      console.error('Error connecting to MongoDB', error)
      throw error
    }
  }
}
