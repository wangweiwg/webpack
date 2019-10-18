/*
 * node-pa | index.js
 * https://github.com/hereandnow/node-pa
 *
 * Copyright (c) 2013 Bastian Behrens
 * Licensed under the MIT license.
 */

'use strict';

/*
 * module dependencies
 */
var fs = require('fs'),
    argv = require('optimist').argv;
    require('colors');

exports = (function () {

  if (argv.install) {
    return require('./alias').install();
  }

  if (!fs.existsSync('package.json')) {
    return console.error('package.json is missing'.red);
  }

  if (argv.a && !argv.alias) {
    argv.alias = argv.a;
    delete argv.a;
  }

  console.log((argv.alias ? require('./alias') : require('./pa')).init().trigger(argv));

})();