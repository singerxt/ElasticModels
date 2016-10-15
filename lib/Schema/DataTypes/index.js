'use strict'

const boolean = require('./boolean/index')
const date = require('./date')
const { long, integer, short, byte, double, float } = require('./numeric/index')
const string = require('./string/index')

module.exports = {
  boolean,
  date,
  long,
  integer,
  short,
  double,
  float,
  byte,
  string
}
