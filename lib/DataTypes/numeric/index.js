'use strict'

const validateInteger = value => Number.isInteger(value)
const validateFloat = value => Number(value) === value % 1 !== 0

/**
 *
 *
 * @type {{long: (function(): {name: string, validate: (function(): boolean)}), integer: (function(): {name: string, validate: (function(): boolean)}), short: (function(): {name: string, validate: (function(): boolean)}), byte: (function(): {name: string, validate: (function(): boolean)}), double: (function(): {name: string, validate: (function(): boolean)}), float: (function(): {name: string, validate: (function(): boolean)})}}
 */
module.exports = {
  long: () => ({
    name: 'long',
    validate: validateInteger
  }),
  integer: () => ({
    name: 'integer',
    validate: validateInteger
  }),
  short: () => ({
    name: 'short',
    validate: validateInteger
  }),
  byte: () => ({
    name: 'byte',
    validate: () => true,
  }),
  double: () => ({
    name: 'byte',
    validate: validateFloat
  }),
  float: () => ({
    name: 'byte',
    validate: validateFloat
  })
}
