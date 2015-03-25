#co-readdir

read a directory and return the filter files

# Installation
---
npm install co-readdir

# Usage
---

参数：

- `dir`: directory
- `filter`: type function

``` 
co(function* () {
  var folder = 'test/fixtures/basic';
  var actual = yield readDir(folder);
  console.log(actual); 
})();

``` 