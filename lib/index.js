'use strict'

module.exports = (elasticSearchClient, options) => ({
  schema: require('./Schema')(elasticSearchClient, options),
  document: require('./Document'),
  dataTypes: require('./Schema/DataTypes')
})
