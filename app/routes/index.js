const RadarModel = require('../models/radar')

module.exports = {
  method: 'GET',
  path: '/',
  options: {
    handler: async (_, h) => {
      const model = new RadarModel()
      const radar = JSON.stringify(model.radar)

      return h.view('index', { radar })
    }
  }
}
