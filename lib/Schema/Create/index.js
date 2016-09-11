'use strict'

const create = ({ schema, options }) => ({
  create: data => document(data, schema, options)
})

module.exports = {
  create
}
