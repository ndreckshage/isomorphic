var expose = require('./expose');

/**
 * return a list of paths + exposed names to be used by isomorphic.require
 *
 * @param {string} dir
 */
module.exports = function (dir) {
  return expose(dir, function (file, callback) {
    var parts = file.replace('./', '').split('.');
    var ext = parts[1];
    if (ext && !!~ext.indexOf('js')) {
      callback({
        path: file,
        expose: parts[0]
      });
    }
  });
};
