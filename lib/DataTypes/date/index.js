'use strict'

const moment = require('moment')

/**
 *
 *
 * @type {{date: (function(): {name: string, validate: (function(): *)})}}
 */
module.exports = {
  date: () => ({
    name: 'date',
    validate: (value, format) => moment(value, Array.isArray(format) ? format : [format], true``).isValid()
  })
}
