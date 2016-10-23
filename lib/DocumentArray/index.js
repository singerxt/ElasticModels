const Promise = require('bluebird')
const document = require('../Document')

const docArrayMethods = ({ data }) => ({
  push: Array.prototype.push.bind(data),
  reduce: Array.prototype.reduce.bind(data),
  sort: Array.prototype.sort.bind(data),
  filter: Array.prototype.filter.bind(data),
  reverse: Array.prototype.reverse.bind(data)
})

const applyModifiers = ({ schema, options = {}, schemaOptions }) => ({
  applyModifiers: result => {
    let response = {}
    const haveCollectionHeader = typeof schemaOptions.collectionHeader === 'function'
    const haveCollectionFooter = typeof schemaOptions.collectionFooter === 'function'

    if (haveCollectionHeader) {
      response = Object.assign(
        response,
        schemaOptions.collectionHeader({
          schema,
          options,
          schemaOptions
        })
      )
    }

    response['members'] = result

    if (haveCollectionFooter) {
      response = Object.assign(
        response,
        schemaOptions.collectionFooter({
          schema,
          options,
          schemaOptions
        })
      )
    }

    return response
  }
})

const getDocuments = ({ data, applyModifiers }) => ({
  getDocuments: () => Promise.all(data.map(x => x.getDocument())).then(applyModifiers)
})

const documentArray = (data, schema, options, schemaOptions) => {
  const state = {
    data: Array.isArray(data.hits.hits) ? data.hits.hits : data || [],
    schema,
    options,
    applyModifiers: applyModifiers({ schema, options, data, schemaOptions }).applyModifiers
  }

  try {
    state.data = state.data.map(obj => document(obj, schema, options))
  } catch (e) {
    throw new Error('Umable to create document array', e)
  }

  return Object.assign(
    {},
    getDocuments(state),
    docArrayMethods(state)
  )
}

module.exports = documentArray
