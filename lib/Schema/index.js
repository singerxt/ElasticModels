'use strict'
const { find, findById } = require('./Find')
const { methods } = require('./Methods')
const { create } = require('./Create')

const schema = (elasticSearchClient, config) => (name, schema, options) => {
  const state = {
    schema,
    options,
    elasticSearchClient,
    config,
    name,
    index: options.index,
    type: options.type,
    methods: {}
  }
  console.log(create);
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
