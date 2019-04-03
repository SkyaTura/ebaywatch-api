import Hapi from 'hapi'
import cors from 'hapi-cors'
import octopus from 'hapi-octopus'
import { server as serverOptions } from './vars'

export default async () => {
  try {
    const server = Hapi.server(serverOptions)

    const src = `${process.cwd()}/src`
    await server.register({
      plugin: cors,
      options: {
        origins: ['http://localhost:3000'],
        methods: ['POST, GET, PUT, OPTIONS'],
      },
    })
    await server.register({
      plugin: octopus,
      options: {
        /*
        methods: {
          cwd: `${src}/methods`,
        },
        handlers: {
          cwd: `${src}/handlers`,
        },
        decorators: {
          cwd: `${src}/decorators`,
        },
        */
        routes: {
          cwd: `${src}/routes`,
        },
      },
    })

    await server.start()

    console.log('Server running at:', server.info.uri)
    return server
  } catch (e) {
    console.error(e)
    process.exit(1)
    return null
  }
}
