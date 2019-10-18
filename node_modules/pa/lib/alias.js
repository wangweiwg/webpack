/*
 * node-pa | alias.js
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

var defaultAliases =     {
  "v": "version",
  "k": "keywords",
  "h": "homepage",
  "n": "name",
  "a": "author",
  "dep": "dependencies",
  "devdep": "devDependencies",
  "desc": "description"
};

/*
 * should only be called via the trigger-function
 */
function Alias () {

  var home = process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'],
      aliasFile = path.resolve(home + '/.pa/aliases.json');

  var writeAliases = function (aliases) {
    fs.writeFileSync(aliasFile, JSON.stringify(aliases, null, 2));
  };

  this.init = function () {
    if (!fs.existsSync(aliasFile)) {
      this.install();
    }
    this.aliases = require(aliasFile);
    return this;
  };

  this.install = function () {
    if (!fs.existsSync(path.resolve(home + '/.pa/'))) {
      fs.mkdirSync(path.resolve(home + '/.pa/'));
    }
    writeAliases(defaultAliases);
  };

  this.list = function () {
    var tmp, list = '';
    for (tmp in this.aliases) {
      list += '\n' + tmp + '=' + this.aliases[tmp];
    }
    return list.substr(1).green;
  };

  this.get = function (key) {
    var tmp;
    for (tmp in this.aliases) {
      if (this.aliases[tmp] === key) {
        return tmp.green;
      }
    }
    return ("no alias for '" + key + "'").red;
  };

  this.set = function (key, value) {
    this.aliases[key] = value;
    writeAliases(this.aliases);
    return ("set alias '" + key + "' for '" + value + "'").green;
  };

  this.trigger = function (argv) {
    if (typeof argv.alias !== 'string') {
      return this.list();
    }
    return argv._[0] ? this.set(argv._[0], argv.alias) : this.get(argv.alias);
  };

}

module.exports = new Alias();