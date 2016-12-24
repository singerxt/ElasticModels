'use strict'

const Promise = require('bluebird')

const applyModifiers = ({ schema, options = {}, schemaOptions, rawData }) => ({
  applyModifiers: (result) => {
    const haveCollectionHeader = typeof schemaOptions.collectionHeader === 'function'
    const haveCollectionFooter = typeof schemaOptions.collectionFooter === 'function'
    const modifierOptions = {
      schema,
      options,
      schemaOptions,
      rawData,
    }

    let response = {}

    if (haveCollectionHeader) {
      response = Object.assign(
        response,
        schemaOptions.collectionHeader(modifierOptions)
      )
    }

    response['members'] = result

    if (haveCollectionFooter) {
      response = Object.assign(
        response,
        schemaOptions.collectionFooter(modifierOptions)
      )
    }

    return response
  }
})

const getDocuments = ({ data, applyModifiers }) => ({
  getDocuments: () => Promise.all(data.map(x => x.getDocument()))
    .then(applyModifiers)
    .catch(e => {
      throw new Error('Error in get documents', e)
    })
})

module.exports = {
  getDocuments,
  applyModifiers
}
