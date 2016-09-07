'use strict';
const Promise = require('bluebird');
const R = require('Ramda');
const Schema = require('../Schema');

const isSimpleField = field => Boolean(field && !field.dependencies && !field.translation);
const isSimpleTranslationField = field => typeof field.translation === 'string';
const isTranslationWithDepField = field => Array.isArray(field.translation);
const isTranslationFunctionField = field => typeof field.translation === 'function';

/**
 * Handle for for simple fields what a translation is a string.
 * eg: {
 *   type: String,
 *   translation: ['namespace.cms.title'],
 * }
 *
 * returning value.
 * @param {object} - Current data from elasticsearch
 * @param {object} - Schema field
 * @returns {any}
 */
const handleSimpleTranslationField = (data, field) => field && R.view(
  R.lensPath(
    field.split('.')
  ),
  data
);

/**
 * Handle translation for fields what have translation as array
 * eg.
 * field: {
 *   type: String,
 *   translation: ['drupal.title', 'title']
 * }
 *
 * returning first possible not empty value.
 * @param {object} - Current data from elasticsearch
 * @param {object} - Schema field
 * @return {any}
 */
const handleTranslationArray = (data, { translation }) => translation
  .map(handleSimpleTranslationField.bind(null, data))
  .filter(x => x)[0];

/**
 * Handle translation for fields what have function as translation.
 *
 */
const handleTranslationFunction = Promise.coroutine(function* (data, field, { translateOptions }) {
  const args = field.dependencies ?
    field.dependencies.map(handleSimpleTranslationField.bind(null, data)) : [];
  let value;

  args.push(translateOptions);
  
  try {
    value = yield field.translation.apply(null, args);
  } catch (e) {
    value = field.translation.apply(null, args);
  }

  return value;
});

/**
 * Each field in schema can have translation property what is
 * definition what should happen with field when we reading doc.
 *
 * eg. of schema fields to handle in translateField
 *
 * name: {          // Simple field without translation
 *   type: String,
 * },
 * surname: {
 *   type: String,
 * },
 * fullName: {      // field with function as translation
 *   type: String,
 *   dependencies: ['name', 'surname'],
 *   translation: (name, surname) => `${name} ${surname}`
 * },
 * facebookLikes: { // translation as asynchronus function
 *   type: String,
 *   dependencies: ['authToken'],
 *   translation: getLikeForUser(authToken), // need to return Promise
 * },
 * id: {           // translation of array of string if first one
 *                 //will be empty second value will be returned
 *   type: String,
 *   translation: ['social.securityNumber', 'social.peselNumber']
 * }
 *
 * @param {object} - Current data from elasticsearch
 * @param {object} - Schema field
 * @params {object} - options
 * @params {string} - current field to translate
 * @returns {any} - translated field.
 */
const translateField = Promise.coroutine(function* (data, schema, options, field) {
  if (isSimpleField(schema[field])) {
    return data[field];
  } else if (isSimpleTranslationField(schema[field])) {
    return handleSimpleTranslationField(data, schema[field].translation);
  } else if (isTranslationWithDepField(schema[field])) {
    return handleTranslationArray(data, schema[field]);
  } else if (isTranslationFunctionField(schema[field])) {
    return yield handleTranslationFunction(data, schema[field], options);
  }

  return null;
});

/**
 * Translate Schema to Document.
 *
 * @param {object} - Current data from elasticsearch
 * @param {object} - Schema field
 * @params {object} - options
 * @returns {any} - translated document.
 */
const translateDocument = Promise.coroutine(function* (data, schema, options) {;
  const doc = {};
  const fields = Object.keys(schema);
  for (let i = 0; i < fields.length; i++) {
    doc[fields[i]] = yield translateField(data, schema, options, fields[i]);
  }

  return doc;
});

const getters = ({ data, schema, options }) => ({
  getDocument: translateDocument.bind(null, data, schema, options),
  getValueForKey: translateField.bind(null, data, schema, options),
  clone: newData => document(newData = data, schema, options),
});

const setters = ({ data, schema, options }) => ({
  setValueForKey: () => {},
});



const validateInitialParams = ({ data, schema }) => {
  if (!schema) {
    throw new Error('schema is missing');
  }
  return true;
};

/**
 *
 * @param data
 * @param schema
 * @param options
 * @returns {*}
 */
const document = (data, schema, options) => {
  const state = {
    data: data._source || data,
    id: data._id,
    schema,
    options,
  };

  return validateInitialParams(state) && Object.assign(
      {},
      getters(state),
      setters(state)
    );
};

module.exports = document;
