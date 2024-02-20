const Joi = require('joi')
const { addRadarEntry } = require('../../storage/repos/radar-entries')
const AddEntryModel = require('../../models/entry/add')
const { quadrants, rings } = require('../../constants/radar')

module.exports = [
  {
    method: 'GET',
    path: '/entry/add',
    options: {
      handler: async (_, h) => {
        return h.view('entry/add', new AddEntryModel(quadrants.items, rings.items))
      }
    }
  },
  {
    method: 'POST',
    path: '/entry/add',
    options: {
      validate: {
        payload: Joi.object({
          name: Joi.string().required(),
          description: Joi.string().allow(null).allow('').optional(),
          ring: Joi.string().required(),
          quadrant: Joi.string().required()
        }),
        failAction: async (request, h, err) => {
          console.error(err)

          return h.view('entry/add', {
            errors: err.details
          }).code(400).takeover()
        }
      },
      handler: async (request, h) => {
        const entry = request.payload

        await addRadarEntry(entry.name, entry.quadrant, entry.ring, entry.description)

        return h.redirect('/')
      }
    }
  }]
