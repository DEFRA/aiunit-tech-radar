const { processRadarEntity } = require('../lib/radar')
const RadarModel = require('../models/radar')
const { getLatestRadar } = require('../storage/repos/radar-entries')

module.exports = {
  method: 'GET',
  path: '/',
  options: {
    handler: async (_, h) => {
      const latest = await getLatestRadar()

      const entries = processRadarEntity(latest)

      const model = new RadarModel(entries)

      return h.view('index', { radar: JSON.stringify(model.radar) })
    }
  }
}
