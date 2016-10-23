'use strict'

const docArrayMethods = ({ data }) => ({
  push: Array.prototype.push.bind(data),
  reduce: Array.prototype.reduce.bind(data),
  sort: Array.prototype.sort.bind(data),
  filter: Array.prototype.filter.bind(data),
  reverse: Array.prototype.reverse.bind(data)
})

module.exports = {
  docArrayMethods
}
