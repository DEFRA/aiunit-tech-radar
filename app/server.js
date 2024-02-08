const config = require('./config')
const Hapi = require('@hapi/hapi')

const createServer = async () => {
  const server = Hapi.Server({
    port: config.port,
    routes: {
      validate: {
        options: {
          abortEarly: false
        }
      }
    },
    router: {
      stripTrailingSlash: true
    }
  })

  await server.register(require('./plugins/router'))

  return server
}

module.exports = createServer
