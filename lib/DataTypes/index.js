'use strict'

const boolean = require('./boolean')
const data = require('./data')
const { long, integer, short, byte, double, float } = require('./numeric')
const string = require('./string')

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
