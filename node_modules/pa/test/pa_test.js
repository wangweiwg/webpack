'use strict';

var fs = require('fs'),
    pa = require('../lib/pa.js');

pa.pkg = {
  version: "0.1.0",
  main: "lib/index"
};

exports['pa-test'] = {

  setUp: function (done) {
    this._writeFileSync = fs.writeFileSync;
    fs.writeFileSync = function () {};
    done();
  },

  tearDown: function (done) {
    fs.writeFileSync = this._writeFileSync;
    done();
  },

  'should return the whole package.json file when param is an empty array': function(test) {
    test.expect(2);
    pa.pkg = {
      version: "0.1.0",
      main: "lib/index"
    };
    var result = pa.trigger({_:[]});
    test.equal(result.indexOf('"version":') > -1, true, 'version is part of returned content');
    test.equal(result.indexOf('"main":') > -1, true, 'main is part of returend content');
    test.done();
  },

  'should return a specified key': function(test) {
    test.expect(2);
    test.equal(pa.trigger({_:['version']}), '\u001b[32m0.1.0\u001b[39m', 'should return the version-property');
    test.equal(pa.trigger({_:['main']}), '\u001b[32mlib/index\u001b[39m', 'should return the main-property');
    test.done();
  },

  'should save a specified key': function(test) {
    test.expect(3);
    test.equal(pa.trigger({_:['version']}), '\u001b[32m0.1.0\u001b[39m', 'the version-property before setting');
    pa.trigger({_:['version', '100.50.99']});
    test.equal(pa.trigger({_:['version']}), '\u001b[32m100.50.99\u001b[39m', 'the version-property after setting');
    pa.trigger({_:['version', '0.1.0']});
    test.equal(pa.trigger({_:['version']}), '\u001b[32m0.1.0\u001b[39m', 'set version-property back to original value');
    test.done();
  }

};