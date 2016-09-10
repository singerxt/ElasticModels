'use strict'
const isIntegerAndBetween = (min, max) => value =>
  value => Boolean(Number.isInteger(value) && value >= min && value <= max)

const validateLong = isIntegerAndBetween(-9223372036854775807, 9223372036854775807)
const validateInteger = isIntegerAndBetween(-2147483648, 2147483648)
const validateShort = isIntegerAndBetween(-32768, 32768)
const validateByte = isIntegerAndBetween(-128, 127)
const validateFloat = value => Number(value) === value % 1 !== 0

/**
 *
 *
 * @type {{long: (function(): {name: string, validate: (function(): boolean)}), integer: (function(): {name: string, validate: (function(): boolean)}), short: (function(): {name: string, validate: (function(): boolean)}), byte: (function(): {name: string, validate: (function(): boolean)}), double: (function(): {name: string, validate: (function(): boolean)}), float: (function(): {name: string, validate: (function(): boolean)})}}
 */
module.exports = {
  long: () => ({
    name: 'long',
    validate: validateLong()
  }),
  integer: () => ({
    name: 'integer',
    validate: validateInteger()
  }),
  short: () => ({
    name: 'short',
    validate: validateShort()
  }),
  byte: () => ({
    name: 'byte',
    validate: validateByte()
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
