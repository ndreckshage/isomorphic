var path = require('path');
var isServer = typeof window === 'undefined';

module.exports = function (modulePath) {
  var base = path.join('app', modulePath);
  return isServer ? require(path.join(process.cwd(), base)) : require(base);
}
