class AddEntryModel {
  constructor (quadrants, rings) {
    this.quadrants = quadrants.map(quadrant => quadrant.name)
    this.rings = rings.map(ring => ring.name)
  }
}

module.exports = AddEntryModel
