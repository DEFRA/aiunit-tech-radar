const { DefaultAzureCredential } = require('@azure/identity')
const { TableClient } = require('@azure/data-tables')
const config = require('../config/storage/table')

const getTableClient = (table) => {
  let tableClient
  if (config.useConnectionString) {
    console.log('Using connection string for Table Client')
    tableClient = TableClient.fromConnectionString(config.connectionString, table, { allowInsecureConnection: true })
  } else {
    console.log('Using DefaultAzureCredential for Table Client')
    tableClient = new TableClient(`https://${config.storageAccount}.table.core.windows.net`, table, new DefaultAzureCredential())
  }

  return tableClient
}

module.exports = {
  getTableClient
}
