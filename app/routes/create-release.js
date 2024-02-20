const CreateReleaseModel = require('../models/create-release')
const { createRadarRelease } = require('../storage/repos/radar-entries')

module.exports = [{
  method: 'GET',
  path: '/create-release',
  options: {
    handler: async (_, h) => {
      const now = new Date()

      return h.view('create-release', new CreateReleaseModel(now.getFullYear(), now.getMonth() + 1))
    }
  }
},
{
  method: 'POST',
  path: '/create-release',
  handler: async (_, h) => {
    const { year, month } = await createRadarRelease()

    return h.redirect(`/${year}/${month}`)
  }
}]
