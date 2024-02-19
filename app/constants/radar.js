const quadrants = {
  INFRASTRUCTURE: 'Infrastructure',
  TOOLS: 'Tools',
  LANGUAGES: 'Languages and Frameworks',
  TECHNIQUES: 'Techniques'
}

const rings = {
  ADOPT: 'ADOPT',
  TRIAL: 'TRIAL',
  ASSESS: 'ASSESS',
  HOLD: 'HOLD'
}

const ringColours = {
  [rings.ADOPT]: '#5ba300',
  [rings.TRIAL]: '#009eb0',
  [rings.ASSESS]: '#c7ba00',
  [rings.HOLD]: '#e09b96'
}

module.exports = {
  quadrants: {
    ...quadrants,
    items: Object.keys(quadrants).map(quadrant => ({
      name: quadrants[quadrant]
    })),
    mapping: Object.keys(quadrants).reduce((acc, quadrant, i) => ({
      ...acc,
      [quadrants[quadrant]]: i
    }), {})
  },
  rings: {
    ...rings,
    items: Object.keys(rings).map(ring => ({
      name: rings[ring],
      color: ringColours[rings[ring]]
    })),
    mapping: Object.keys(rings).reduce((acc, ring, i) => ({
      ...acc,
      [rings[ring]]: i
    }), {})
  }
}
