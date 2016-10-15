'use strict'
const { find, findById } = require('./Find')
const { methods } = require('./Methods')
const { create } = require('./Create')

const schema = (elasticSearchClient, config) => (name, schema, options) => {
  if (!name || !schema || !options) {
    throw new Error('Wrong schema definition name, schema, options are required.')
  }

  const state = {
    schema,
    options,
    elasticSearchClient,
    config,
    name,
    index: options.index,
    type: options.type,
    methods: {},
    schemaOptions: options
  }

  return Object.assign(
    {},
    findById(state),
    find(state),
    methods(state),
    create(state),
    { methods: state.methods },
    state
  )
}

module.exports = schema
