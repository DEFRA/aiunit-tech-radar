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
      quadrants: quadrants.items,
      rings: rings.items,
      print_layout: true,
      links_in_new_tabs: true,
      entries
    }
  }
}

module.exports = RadarModel
