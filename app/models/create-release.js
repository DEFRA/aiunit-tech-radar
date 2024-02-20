class CreateReleaseModel {
  constructor (year, month) {
    this.year = `${year}`.padStart(4, '0')
    this.month = `${month}`.padStart(2, '0')
  }
}

module.exports = CreateReleaseModel
