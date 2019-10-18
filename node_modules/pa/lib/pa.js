/*
 * node-pa | pa.js
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
    path = require('path');
    require('colors');

/*
 * should only be called via the trigger-function
 */
function Pa () {

  var paFile = path.resolve('package.json');

  var writePackageJson = function (json) {
    fs.writeFileSync(paFile, JSON.stringify(json, null, 2));
  };

  this.init = function () {
    this.pkg = require(paFile);
    return this;
  };

  this.get = function (key) {
    var val = this.pkg[key] || this.pkg[require('./alias').init().aliases[key]];
    if (typeof val === 'undefined') {
      return ('can not read property ' + key + ' from package.json').red;
    }
    return (typeof val === 'object' ? JSON.stringify(val, null, 2) : val).green;
  };

  this.set = function (key, value) {
    key = this.pkg[key] ? key : require('./alias').init().aliases[key];
    this.pkg[key] = value;
    writePackageJson(this.pkg);
    return ("set key '" + key + "' to value '" + value + "'").green;
  };

  this.trigger = function (argv) {
    switch (argv._.length) {
      case 0:
        return JSON.stringify(this.pkg, null, 2).green;
      case 1:
        return this.get(argv._[0]);
      case 2:
        return this.set(argv._[0], argv._[1]);
      default:
        return "something bad happened, just run 'pa [key] [value]' to set the new value in your package.json";
    }

  };

}

module.exports = new Pa();