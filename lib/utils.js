var isServer = typeof window === 'undefined';
var path = require('path');

function _require (modulePath) {
  var base = path.join('app', modulePath);
  return isServer ? require(path.join(process.cwd(), base)) : require(base);
}

exports.require = _require;
