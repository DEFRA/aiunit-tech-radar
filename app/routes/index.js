const { processRadarEntity } = require('../lib/radar')
const RadarModel = require('../models/radar')
const { getRadar } = require('../storage/repos/radar-entries')

module.exports = [{
  method: 'GET',
  path: '/',
  options: {
    handler: async (_, h) => {
      const radar = await getRadar()

      const entries = processRadarEntity(radar)

      const model = new RadarModel(entries)

      return h.view('index', { radar: JSON.stringify(model.radar) })
    }
  }
},
{
  method: 'GET',
  path: '/{year}/{month}',
  options: {
    handler: async (request, h) => {
      const radar = await getRadar(request.params.year, request.params.month)

      const entries = processRadarEntity(radar)

      const model = new RadarModel(entries)

      return h.view('index', { radar: JSON.stringify(model.radar) })
    }
  }
}]
