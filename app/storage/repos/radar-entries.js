const config = require('../../config/storage/table')
const { getTableClient } = require('../table')
const { odata } = require('@azure/data-tables')
const { addVersion } = require('./radar-versions')

const client = getTableClient(config.radarTable)

const enrichEntry = (entry, partitionKey) => ({
  ...entry,
  partitionKey,
  rowKey: encodeURIComponent(entry.name)
})

const calculatePartitionKey = (year, month) => {
  const paddedYear = `${year}`.padStart(4, '0')
  const paddedMonth = `${month}`.padStart(2, '0')

  return `AI_UNIT_${paddedYear}_${paddedMonth}`
}

const entriesDto = (entries) => entries.map(entry => ({
  name: entry.name,
  quadrant: entry.quadrant,
  ring: entry.ring,
  description: entry.description,
  url: entry.url
}))

const queryEntriesByPartition = (partition, additionalOptions) => {
  const results = client.listEntities({
    queryOptions: {
      filter: odata`PartitionKey eq ${partition}`,
      ...additionalOptions
    }
  })

  return results
}

const deleteEntriesByPartition = async (partition) => {
  const iter = queryEntriesByPartition(partition)

  for await (const entity of iter) {
    await client.deleteEntity(entity.partitionKey, entity.rowKey)
  }
}

const getRadar = async (year, month) => {
  const partition = (year && month) ? calculatePartitionKey(year, month) : 'AI_UNIT'

  const iter = queryEntriesByPartition(partition)

  const entries = []

  for await (const entity of iter) {
    entries.push(entity)
  }

  return entriesDto(entries)
}

const getRadarRelease = async (year, month) => {
  const iter = queryEntriesByPartition(calculatePartitionKey(year, month))

  const entries = []

  for await (const entity of iter) {
    entries.push(entity)
  }

  return entriesDto(entries)
}

const checkIfEntryExists = async (entry) => {
  const iter = queryEntriesByPartition('AI_UNIT', {
    filter: odata`RowKey eq ${encodeURIComponent(entry.name)}`
  })

  const { value } = await iter[Symbol.asyncIterator]().next()

  return value !== undefined
}

const addRadarEntry = async (name, quadrant, ring, description) => {
  const entry = {
    name,
    quadrant,
    ring,
    description
  }

  const entity = enrichEntry(entry, 'AI_UNIT')

  const exists = await checkIfEntryExists(entity)

  if (!exists) {
    return client.createEntity(entity)
  }

  return client.updateEntity(entity)
}

const createRadarRelease = async () => {
  const now = new Date()

  const year = now.getFullYear()
  const month = now.getMonth() + 1

  const partitionKey = calculatePartitionKey(year, month)

  await deleteEntriesByPartition(partitionKey)

  const iter = queryEntriesByPartition('AI_UNIT')

  for await (const entity of iter) {
    const entry = enrichEntry(entity, partitionKey)
    await client.createEntity(entry)
  }

  await addVersion(year, month)

  return { year, month }
}

module.exports = {
  getRadar,
  getRadarRelease,
  addRadarEntry,
  createRadarRelease
}
