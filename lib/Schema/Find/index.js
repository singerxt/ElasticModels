'use strict'
const documentArray = require('../../DocumentArray')
const document = require('../../Document')

/**
 *
 * @param elasticSearchClient
 * @param index
 * @param type
 * @param schema
 */
const find = ({ elasticSearchClient, index, type, schema }) => ({
  find: (query = {}, options = {}) => elasticSearchClient.search({
    index: index,
    type: type,
    size: options.size || 25,
    from: options.from || 0,
    body: query
  }).then(results => documentArray(results, schema, options).getDocuments())
})

/**
 *
 * @param elasticSearchClient
 * @param index
 * @param type
 */
const findById = ({ elasticSearchClient, index, type, schema, options }) => ({
  findById: id => elasticSearchClient.get({
    index,
    type,
    id
  }).then(results => document(results, schema, options).getDocument())
})

module.exports = {
  find,
  findById
}
