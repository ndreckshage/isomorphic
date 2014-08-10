var fs = require('fs');

/**
 * return a list of paths + exposed names
 * @param {string} dir
 * @param {function} determineStructure
 */
module.exports = function (dir, determineStructure) {
  var results = [];

  /**
   * internal, recursive fn to get paths/exposed names
   *
   * @param {string} dir
   */
  function _expose (dir) {
    var list = fs.readdirSync(dir);
    list.forEach(function (file) {
      file = dir + '/' + file;
      var stat = fs.statSync(file);
      if (stat && stat.isDirectory()) {
        var subRoutes = _expose(file);
        results.concat(subRoutes);
      } else {
        determineStructure(file, function (structure) {
          results.push(structure);
        });
      }
    });
  }

  _expose(dir);
  return results;
};
