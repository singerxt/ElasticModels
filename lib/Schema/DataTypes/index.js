'use strict'

const boolean = require('./boolean/index')
const data = require('./data')
const { long, integer, short, byte, double, float } = require('./numeric/index')
const string = require('./string/index')

module.exports = {
  boolean,
  data,
  long,
  integer,
  short,
  double,
  float,
  byte,
  string
}
