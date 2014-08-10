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
    if (ext === 'css' || ext === 'styl') {
      callback({
        path: file,
        expose: parts[0].split('assets/stylesheets/')[1]
      });
    }
  });
};
