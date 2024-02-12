const { quadrants, rings } = require('../constants/radar')

const processRadarEntity = (radar = []) => {
  const entries = []

  for (const entry of radar) {
    const quadrant = quadrants.mapping[entry.quadrant]
    const ring = rings.mapping[entry.ring]

    if (quadrant === undefined) {
      console.warn(`Unknown quadrant: ${entry.quadrant}`)
      continue
    }

    if (ring === undefined) {
      console.warn(`Unknown ring: ${entry.ring}`)
      continue
    }

    entries.push({
      label: entry.name,
      quadrant,
      ring,
      link: entry.url,
      moved: 0
    })
  }

  return entries
}

module.exports = {
  processRadarEntity
}
