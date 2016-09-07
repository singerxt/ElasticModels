'use strict'

module.exports = (elasticSearchClient, options) => ({
  schema: require('./Schema')(elasticSearchClient, options)
})
