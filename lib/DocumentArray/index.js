const Promise = require('bluebird')
const document = require('../Document')

const docArrayMethods = ({ data }) => ({
  push: Array.prototype.push.bind(data),
  reduce: Array.prototype.reduce.bind(data),
  sort: Array.prototype.sort.bind(data),
  filter: Array.prototype.filter.bind(data),
  reverse: Array.prototype.reverse.bind(data)
})

const getDocuments = ({ data }) => ({
  getDocuments: () => Promise.all(data.map(x => x.getDocument()))
})

const documentArray = (data, schema, options) => {
  const state = {
    data: Array.isArray(data.hits.hits) ? data.hits.hits : data || [],
    schema,
    options
  }

  state.data = state.data.map(obj => document(obj, schema, options))
  return Object.assign(
    {},
    getDocuments(state),
    docArrayMethods(state)
  )
}

module.exports = documentArray
