#co-readdir

read a directory and return the filter files

# Installation
---
npm install co-readdir


参数：

- `dir`: directory
- 'ignore': minimatch
- `filter`: type function

# Usage
---

``` 
var readDir = require('co-readdir');
co(function* () {
  var folder = 'test/fixtures/basic';
  var ignore = '*.js';
  function filter(x) {
    return x[0] !== '.';
  }
  var actual = yield readDir(folder, ignore, filter);
})();

``` 