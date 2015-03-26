var fs = require('co-fs');
var each = require('co-each');
var join = require('path').join;
var minimatch = require('minimatch');

function* readDir(dir, ignore, filter) {
  if(typeof ignore === 'function') filter = ignore;

  var filterFn = typeof filter === 'undefined' ? noDotFiles : filter;
  var out = [];

  function* walk(dir) {
    var nodes = yield fs.readdir(dir);
    var exist = yield fs.exists(dir); 
    if(!exist) return;

    yield each(nodes.filter(filterFn), function* (node) {
      var path = join(dir, node);
      var match = false;

      var stats = yield fs.lstat(path);
      if (stats.isDirectory()) {
        return yield walk(path);
      }
      
      if(ignore) {
        match = yield miniMatch(path, ignore);
      }

      !match && out.push(path);
    });
    return out;
  }

  return yield walk(dir); 
}

function*  miniMatch(str, ignore) {
  var opts = {
    matchBase:true
  };
  if (!hasGlob(ignore)) return;
  return minimatch(str, ignore, opts);
}

function noDotFiles(x) {
  return x[0] !== '.';
}

function hasGlob(x) {
  return ~x.indexOf('*')
}

module.exports = readDir;
