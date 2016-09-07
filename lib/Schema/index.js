const document = require('../Document');
const documentArray = require('../DocumentArray');

const find = ({ elasticSearchClient, index, type, schema }) => ({
  find: (query = {}, options = {}) => elasticSearchClient.search({
    index: index,
    type: type,
    size: options.size || 25,
    from: options.from || 0,
    body: query,
  }).then(results => documentArray(results, schema, options).getDocuments()),
});

/**
 *
 * @param elasticSearchClient
 * @param index
 * @param type
 */
const findById = ({ elasticSearchClient, index, type, schema, options }) => ({
  findById: id => elasticSearchClient.get({
    index,
    type,
    id,
  }).then(results => document(results, schema, options).getDocument()),
});

const save = state => ({
  save: object => {
    console.log('save', obj);
  }
});

const getRawData = state => ({
  getRawData: () => state.obj,
});

const validateOptions = options => {
  return true;
};

const mathods = state => ({
  addMethod: function (name, func) {
    if (typeof name !== 'string') {
      throw new Error('Cannot add methods without name. Name need to be a string');
    }

    if (typeof func !==  'function') {
      throw new Error('Cannot add method without function.')
    }

    if (this.methods[name]) {
      throw new Error(`${name} method is already defined!`);
    }

    this.methods[name] = func.bind(this);
  }.bind(Object.assign(
    {},
    state,
    findById(state),
    find(state)
  )),
  deleteMethod: function (name) {
    if (this.methods[name]) {
      this.methods[name] = null;
    }
  }.bind(this),
});

const schema = (elasticSearchClient, config) => (name, schema, options) => {
  const state = {
    schema,
    options,
    elasticSearchClient,
    config,
    name,
    index: options.index,
    type: options.type,
    methods: {},
  };

  return Object.assign(
    {},
    findById(state),
    find(state),
    mathods(state),
    { methods: state.methods },
    state
  );
};

module.exports = schema;