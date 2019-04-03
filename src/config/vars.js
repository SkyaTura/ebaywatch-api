import dotenv from 'dotenv'
import { inspect } from 'util'

dotenv.config()

export const env = process.env.NODE_ENV || 'development'
export const isDev = env === 'development'
export const isProd = env === 'production'

export const cors = {
  origins: (process.env.CORS_ORIGINS || '').split(','),
  methods: (process.env.CORS_METHODS || '').split(','),
}

export const server = {
  host: process.env.HOST || '0.0.0.0',
  port: process.env.PORT || 4000,
}

export const mongo = {
  uri: process.env.MONGO_URI,
  dbName: process.env.MONGO_DATABASE,
  user: process.env.MONGO_USER,
  password: process.env.MONGO_PASSWORD,
}

export const mailgun = {
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN,
}

if (isDev) {
  console.log('Environment: ', inspect(module.exports, { colors: true }))
}
