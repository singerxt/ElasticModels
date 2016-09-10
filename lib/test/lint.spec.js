const lint = require('mocha-eslint');
const paths = [
  './lib'
];
const options = {};

options.alwaysWarn = false;
options.timeout = 5000;

lint(paths, options);