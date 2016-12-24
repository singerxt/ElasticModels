'use strict'

const document = require('../Document')
const { applyModifiers, getDocuments } = require('./Collection')
const { docArrayMethods } = require('./Array')

const documentArray = (data, schema, options, schemaOptions) => {
  const rawData = data
  const state = {
    data: Array.isArray(data.hits.hits) ? data.hits.hits : data || [],
    schema,
    options,
    applyModifiers: applyModifiers({ schema, options, rawData, data, schemaOptions }).applyModifiers
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
