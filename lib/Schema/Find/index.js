'use strict'
const documentArray = require('../../DocumentArray')
const document = require('../../Document')

/**
 *
 * @param {object} - elasticSearchClient
 * @param {string} - index
 * @param {string} - type
 * @param {object} - schema
 * @
 */
const find = ({ elasticSearchClient, index, type, schema, schemaOptions }) => ({
  find: (query = {}, options = {}) => elasticSearchClient.search({
    index: index,
    type: type,
    size: options.size || 25,
    from: options.from || 0,
    body: query
  }).then(results => documentArray(results, schema, options, schemaOptions))
})

/**
 *
 * @param {object} - elasticSearchClient
 * @param {string} - index
 * @param {type} -
 */
const findById = ({ elasticSearchClient, index, type, schema, options, schemaOptions }) => ({
  findById: id => elasticSearchClient.get({
    index,
    type,
    id
  }).then(results => document(results, schema, options, schemaOptions))
})

module.exports = {
  find,
  findById
}
