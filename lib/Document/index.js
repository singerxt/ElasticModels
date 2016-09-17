'use strict'

const { translateDocument, translateField } = require('./Translate')

const getters = ({ data, schema, options }) => ({
  getDocument: translateDocument.bind(null, data, schema, options),
  getValueForKey: translateField.bind(null, data, schema, options)
})

const setters = ({ data, schema, options }) => ({
  setValueForKey: () => {}
})

const validateInitialParams = ({ data, schema }) => {
  if (!schema) {
    throw new Error('schema is missing')
  }
  return true
}

/**
 *
 * @param data
 * @param schema
 * @param options
 * @returns {*}
 */
const document = (data, schema, options) => {
  const state = {
    data: data._source || data,
    id: data._id,
    schema,
    options
  }

  return validateInitialParams(state) && Object.assign(
      {},
      getters(state),
      setters(state)
    )
}

module.exports = document
