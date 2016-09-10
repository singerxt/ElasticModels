'use strict'

/**
 *
 *
 * @type {{boolean: (function(): {name: string, validate: (function(): boolean)})}}
 */
module.exports = {
  boolean: () => ({
    name: 'boolean',
    validate: value => typeof value === 'boolean'
  })
}
