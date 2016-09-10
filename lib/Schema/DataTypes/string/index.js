'use strict'

const validate = value => typeof value === 'string'

/**
 *
 *
 * @type {{string: (function(): {name: string, validate: (function(): boolean)})}}
 */
module.exports = {
  string: () => ({
    name: 'string',
    validate
  })
}
