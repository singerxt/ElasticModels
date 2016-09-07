'use strict';
const app = require('express')();
const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({
  host: '',
  log: 'trace'
});

const schema = require('../../../lib')(client, {});

const video = schema('video', {
  id: {
    type: String,
    analyzed: true,
  },
  name: {
    type: String,
    analyzed: true,
  },
  nid: {
    type: String,
    translation: 'drupal.nid',
  },
  _dcg_published: {
    type: Boolean,
  },
  test: {
    type: String,
    translation: ['drupal.title', 'id'],
  },
  funcTest: {
    type: String,
    dependencies: ['drupal.title', 'id'],
    translation: (title, id) => title + 'function translation ' + id,
  },
  funcTestAsync: {
    type: String,
    dependencies: ['drupal.title', 'id'],
    translation: (title, drupal) => new Promise(resolve => {
      setTimeout(() => {
        resolve(title + 'async!' + id);
      }, 500);
    }),
  }
});

module.exports = video;
