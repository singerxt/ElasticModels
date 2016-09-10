'use strict';

const { long, integer, short, byte, double, float } = require('./index');

describe('Numeric data type ./lib/Schema/DataTypes/numeric', function () {
  describe('long', () => {
    it('Should be a function', done => {
      long.should.be.type('function')
      done()
    })

    it('Should return true for valid long number', done => {
      const validNumbers = [123321,123123,4545645,34345343,3223344412, Number.MAX_SAFE_INTEGER, -2132131];

      validNumbers.forEach(num => long().validate(num).should.be.true())
      done()
    })

    it('Should return false for not valid long number', done => {
      const inValidNumbers = [null, 'string', [], {}, -9223372036854775812112, 92233720368547758123];

      inValidNumbers.forEach(num => long().validate(num).should.be.false())
      done()
    })
  })

  describe('integer', () => {
    it('Should be a function', done => {
      integer.should.be.type('function')
      done()
    })

    it('Should return true for valid integer number', done => {
      const validNumbers = [123123, 23231, 321312, 32312, 231123]

      validNumbers.forEach(num => integer().validate(num).should.be.true())
      done()
    })

    it('Should return false for not valid integer number', done => {
      const inValidNumbers = [null, 'string', [], {}, 21474836481, -214748123640]

      inValidNumbers.forEach(num => integer().validate(num).should.be.false())
      done()
    })
  })

  describe('byte', () => {
    it('Should be a function', done => {
      integer.should.be.type('function')
      done()
    })

    it('Should return true for valid byte number', done => {
      const validNumbers = [100, 60, 120, 1, 20]

      validNumbers.forEach(num => byte().validate(num).should.be.true())
      done()
    })

    it('Should return false for not valid byte number', done => {
      const inValidNumbers = [null, 'string', [], {}, 200, -200]

      inValidNumbers.forEach(num => byte().validate(num).should.be.false())
      done()
    })
  })

  describe('short', () => {
    it('Should be a function', done => {
      integer.should.be.type('function')
      done()
    })

    it('Should return true for valid short number', done => {
      const validNumbers = [12312, 2323, 32131, 3231, 23113]

      validNumbers.forEach(num => short().validate(num).should.be.true())
      done()
    })

    it('Should return false for not valid short number', done => {
      const inValidNumbers = [null, 'string', [], {}, 2147483, -21474812]

      inValidNumbers.forEach(num => short().validate(num).should.be.false())
      done()
    })
  })

  describe('double', () => {
    it('Should be a function', done => {
      integer.should.be.type('function')
      done()
    })

    it('Should return true for valid double number', done => {
      const validNumbers = [122.1, 23.13, 999.12]

      validNumbers.forEach(num => double().validate(num).should.be.true())
      done()
    })

    it('Should return false for not valid double number', done => {
      const inValidNumbers = [null, 'string', [], {}, 2147483, -21474812]

      inValidNumbers.forEach(num => double().validate(num).should.be.false())
      done()
    })
  })
})