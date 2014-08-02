var fs = require('fs');
module.exports = function (dir) {
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
