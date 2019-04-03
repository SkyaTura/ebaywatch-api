import mongoose from 'mongoose'
import { mongo } from './vars'

export default () =>
  mongoose
    .connect(mongo.uri || 'mongodb://localhost/admin', {
      user: mongo.user,
      pass: mongo.pass,
      dbName: mongo.dbName,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => console.info(`🎲 Mongoose conected`))
