'use strict'

const { findById, find } = require('../Find')

/**
 *
 *
 * @param {object} - state of schema instance
 * @return {object} - methods
 *         {function} - methods.addMethod - Helper for extending schema
 *         {function} - methods.delete - Helper for removing methods from schema
 */
const methods = state => ({
  addMethod: function (name, func) {
    if (typeof name !== 'string') {
      throw new Error('Cannot add methods without name. Name need to be a string')
    }

    if (typeof func !== 'function') {
      throw new Error('Cannot add method without function.')
    }

    if (this.methods[name]) {
      throw new Error(`${name} method is already defined!`)
    }

    this.methods = this.methods || {}
    this.methods[name] = func.bind(this)
  }.bind(Object.assign(
    {},
    state,
    findById(state),
    find(state)
  )),
  deleteMethod: function (name) {
    if (this.methods[name]) {
      this.methods[name] = null
    }
  }.bind(state)
})

module.exports = {
  methods
}
