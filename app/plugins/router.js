const routes = [].concat(
  require('../routes/healthy'),
  require('../routes/healthz'),
  require('../routes/index'),
  require('../routes/static'),
  require('../routes/create-release'),
  require('../routes/entry/add')
)

module.exports = {
  plugin: {
    name: 'router',
    register: (server, _) => {
      server.route(routes)
    }
  }
}
