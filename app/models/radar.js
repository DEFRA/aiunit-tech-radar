const { quadrants, rings } = require('../constants/radar')

class RadarModel {
  constructor (entries = []) {
    this.radar = {
      svg_id: 'radar',
      width: 1450,
      height: 1000,
      scale: 1.0,
      colors: {
        background: '#fff',
        grid: '#bbb',
        inactive: '#ddd'
      },
      title: 'Tech Radar',
      quadrants: [
        { name: quadrants.INFRASTRUCTURE },
        { name: quadrants.TOOLS },
        { name: quadrants.LANGUAGES },
        { name: quadrants.TECHNIQUES }
      ],
      rings: [
        { name: rings.ADOPT, color: '#5ba300' },
        { name: rings.TRIAL, color: '#009eb0' },
        { name: rings.ASSESS, color: '#c7ba00' },
        { name: rings.HOLD, color: '#e09b96' }
      ],
      print_layout: true,
      links_in_new_tabs: true,
      entries
    }
  }
}

module.exports = RadarModel
