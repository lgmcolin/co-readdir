var fs = require('co-fs');
var each = require('co-each');
var join = require('path').join;
var coFilter = require('co-filter');
var co = require('co');

function* readDir(dir, ignore, filter) {
  var filterFn = typeof filter === 'undefined' ? noDotFiles : filter; 
  var out = [];

  function* walk(dir) {
    var nodes = yield fs.readdir(dir);

    yield each(nodes.filter(filterFn), function* (node) {
      var path = join(dir, node);
      
      var stats = yield fs.lstat(path);

      if (stats.isDirectory()) {
        return yield walk(path);
      }

      out.push(path);
    });
    return out;
  }

  return yield walk(dir);
}

function noDotFiles(x) {
  return x[0] !== '.';
}

module.exports = readDir;