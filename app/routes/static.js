module.exports = {
  method: 'GET',
  path: '/static/{path*}',
  options: {
    handler: {
      directory: {
        path: [
          'app/dist'
        ]
      }
    }
  }
}
