var isServer = typeof window === 'undefined';
var path = require('path');
var cwd = process.cwd();
var fs = require('fs');

function walk (dir) {
  var results = [];
  (function _walk (dir) {
    var list = fs.readdirSync(dir);
    var pending = list.length;
    list.forEach(function (file) {
      file = dir + '/' + file;
      var stat = fs.statSync(file);
      if (stat && stat.isDirectory()) {
        var subRoutes = _walk(file);
        results.concat(subRoutes);
      } else {
        results.push({
          path: file,
          expose: file.replace('./', '').split('.')[0]
        });
      }
    });
  })(dir);
  return results;
}

function _require (modulePath) {
  var base = path.join('app', modulePath);
  return isServer ? require(path.join(cwd, base)) : require(base);
}

exports.walk = walk;
exports.require = _require;
