'use strict';

const { isSimpleField, isSimpleTranslationField } = require('./index');

describe('Translations ./lib/Document/Translate', function () {
  const simpleSchemaField = {}
  const simpleSchemaTranslationField = {
    translation: 'namespace.name',
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
})
