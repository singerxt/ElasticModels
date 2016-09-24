'use strict';

const {
  isSimpleField,
  isSimpleTranslationField,
  isTranslationWithDepField,
  isTranslationFunctionField,
  handleSimpleTranslationField,
  handleTranslationArray
} = require('./index');

describe('Translations ./lib/Document/Translate', function () {
  const simpleSchemaField = {}
  const simpleSchemaTranslationField = {
    translation: 'namespace.name'
  }
  const simplSchmaTranslationWithDep = {
    translation: ['notexsit.name, namespace.name']
  }
  const schemaTranslationFunctionFieldSync = {
    dependencies: ['namespace.name'],
    translation: value => value
  }
  const schemaTranslationFunctionFieldAsync = {
    dependencies: ['namespace.name'],
    translation: value => new Promise(resolve => resolve(value + 'async'))
  }

  describe('isSimpleField', () => {
    it('Should return true for simple schema field', done => {
      isSimpleField(simpleSchemaField).should.be.true()
      done()
    })

    it('Should return false for not simple schema field', done => {
      isSimpleField(simpleSchemaTranslationField).should.be.false();
      done()
    })
  })

  describe('isSimpleTranslationField', done => {
    it('Should return true for simple with translation schema field', done => {
      isSimpleTranslationField(simpleSchemaTranslationField).should.be.true()
      done()
    })

    it('Should return false for not simple with translation schema field', done => {
      isSimpleTranslationField(simpleSchemaField).should.be.false();
      done()
    })
  })

  describe('isSimpleTranslationWithDep', done => {
    it('Should return true for simple with translation with dep schema field', done => {
      isTranslationWithDepField(simplSchmaTranslationWithDep).should.be.true()
      done()
    })

    it('Should return false for not simple with translation with dep schema field', done => {
      isTranslationWithDepField(simpleSchemaTranslationField).should.be.false();
      done()
    })
  })

  describe('handleSimpleTranslationField', () => {
    it('Should return correct value and understand dot syntax', done => {
      handleSimpleTranslationField({
        data: {
          name: 'Mateusz'
        }
      }, 'data.name').should.be.equal('Mateusz')
      done()
    })

    it('Should return correct value', (done) => {
      handleSimpleTranslationField({ name: 'Mateusz' }, 'name').should.be.equal('Mateusz')
      done()
    })
  })

  describe('handleTranslationArray', () => {
    it('Should return correct value and understand dot syntax', done => {
      handleTranslationArray({
        data: {
          name: 'Mateusz'
        }
      }, ['data.name']).should.be.equal('Mateusz')
      done()
    })
  })
})
