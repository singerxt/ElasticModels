'use strict'

/**
 *
 * @param elasticSearchClient
 * @param index
 * @param type
 * @param schema
 * @param schemaOptions
 */
const save = ({ elasticSearchClient, index, type, schema, schemaOptions }) => ({
  save: () => elasticSearchClient.bulk({

  })
})

module.exports = {
  save
}
