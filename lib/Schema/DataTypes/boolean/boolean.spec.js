'use strict';

const { boolean } = require('./index');

describe('Boolean data type ./lib/Schema/DataTypes/boolean', function () {
  const wrongTypes = {
    string: '',
    object: {},
    number: 1,
    array: []
  }

  it('Should be a function', done => {
    boolean.should.be.type('function');
    done()
  })

  it('Should return false if non boolean passed to validate method', done => {
    for (let type in wrongTypes) {
      boolean().validate(wrongTypes[type]).should.be.false()
    }
    done()
  })

  it('Should return true if boolean passed to validate method', done => {
    boolean().validate(true).should.be.true()
    boolean().validate(false).should.be.true()
    done()
  })
})