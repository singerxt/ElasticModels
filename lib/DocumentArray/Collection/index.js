'use strict';

const applyModifiers = ({ schema, options = {}, schemaOptions }) => ({
  applyModifiers: result => {
    const haveCollectionHeader = typeof schemaOptions.collectionHeader === 'function'
    const haveCollectionFooter = typeof schemaOptions.collectionFooter === 'function'
    const modifierOptions = {
      schema,
      options,
      schemaOptions,
      rawData: result
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
  getDocuments: () => Promise.all(data.map(x => x.getDocument())).then(applyModifiers).catch(console.log)
})

module.exports = {
  getDocuments,
  applyModifiers
}
