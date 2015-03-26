var relative = require('path').relative;
var assert = require('assert');
var each = require('co-each');
var walk = require('../');
var fs = require('co-fs');
var co = require('co');

describe('.walk()', function () {
  it('should walk a folder', co(function* () {
    var folder = 'test/fixtures/basic';
    var actual = yield walk(folder);

    var expected = [
     'test/fixtures/basic/app.js'
    ];

    assert.deepEqual(actual, expected);
  }));

  it('test ignore', co(function* () {
    var folder = 'test/fixtures/basic'
    var actual = yield walk(folder, '*.js');

    var expected = [];

    assert.deepEqual(actual, expected);
  }));
});
