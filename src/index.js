import mongoose from './config/mongoose'
import hapi from './config/hapi'
import crons from './config/crons'

const init = async () => {
  await mongoose()
  await crons()
  await hapi()
}

init()
