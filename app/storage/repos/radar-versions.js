const config = require('../../config/storage/table')
const { getTableClient } = require('../table')
const { odata } = require('@azure/data-tables')

const partitionKey = 'AI_UNIT'

let client = getTableClient(config.radarVersionTable)

const addVersion = async (year, month) => {
  const entity = {
    partitionKey,
    rowKey: `${year}_${month}`
  }

  // check if entity already exists
  const exists = await client.getEntity(entity.partitionKey, entity.rowKey)

  if (!exists) {
    await client.createEntity(entity)
  }

  console.warn(`Version (${entity.rowKey}) already exists`)
}

const getVersions = async () => {
  const results = client.listEntities({
    queryOptions: {
      filter: odata`PartitionKey eq ${partitionKey}`
    }
  })

  const versions = []

  for await (const { value } of results) {
    versions.push(value)
  }

  if (versions.length === 0) {
    console.warn('No radar versions found')
    return null
  }

  return versions
}

const getLatestRadar = async () => {
  const results = client.listEntities({
    queryOptions: {
      filter: odata`PartitionKey eq ${partitionKey}`
    }
  })

  const versions = []

  for await (const { value } of results) {
    versions.push(value)
  }

  if (versions.length === 0) {
    console.warn('No radar versions found')
    return null
  }

  versions.sort((a, b) => {
    const [aYear, aMonth] = a.rowKey.split('_')
    const [bYear, bMonth] = b.rowKey.split('_')

    return aYear === bYear
      ? aMonth - bMonth
      : aYear - bYear
  })

  return versions[0]
}

module.exports = {
  addVersion,
  getVersions,
  getLatestRadar
}
