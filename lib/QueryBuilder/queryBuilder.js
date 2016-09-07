'use strict'

const translateFields = ({schema, options = {}}) => ({
  translateFields: (query) => {
    if (!query) return {}
    if (options.useNative) return query
  }
})

const queryBuilder = (schema) => {
  const state = {
    schema
  }

  return Object.assign(
    {},
    translateFields(state)
  )
}

module.exports = queryBuilder
