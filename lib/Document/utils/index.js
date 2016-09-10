'use strict';
const R = require('Ramda')

const dataToSchemaSource = () => ({
  redoTranslations: (data, schema) => R.map()
})

const utils = () => {
  return {
    dataToSchemaSource,
  }
}

module.exports = utils
