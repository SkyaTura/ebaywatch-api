import mongoose from 'mongoose'
import { mongo } from './vars'

export default () =>
  mongoose
    .connect(mongo.uri || 'mongodb://localhost/admin', {
      user: mongo.user || 'root',
      pass: mongo.pass || 'example',
      dbName: mongo.dbName || 'oruby',
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => console.info(`🎲 Mongoose conected`))
