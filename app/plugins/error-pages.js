module.exports = {
  plugin: {
    name: 'error-pages',
    register: (server, options) => {
      server.ext('onPreResponse', (request, h) => {
        const response = request.response

        if (response.isBoom) {
          const statusCode = response.output.statusCode

          request.log('error', {
            statusCode,
            data: response.data,
            message: response.message
          })
        }
        return h.continue
      })
    }
  }
}
