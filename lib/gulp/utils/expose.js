var fs = require('fs');

/**
 * return a list of paths + exposed names to be used by isomorphic.require
 *
 * @param {string} dir
 */
module.exports = function (dir) {
  var results = [];

  /**
   * internal, recursive fn to get paths/exposed names
   *
   * @param {string} dir
   */
  function _expose (dir) {
    var list = fs.readdirSync(dir);
    var pending = list.length;
    list.forEach(function (file) {
      file = dir + '/' + file;
      var stat = fs.statSync(file);
      if (stat && stat.isDirectory()) {
        var subRoutes = _expose(file);
        results.concat(subRoutes);
      } else {
        var parts = file.replace('./', '').split('.');
        var ext = parts[1];
        if (ext && !!~ext.indexOf('js')) {
          results.push({
            path: file,
            expose: parts[0]
          });
        }
      }
    });
  }

  _expose(dir);
  return results;
};
