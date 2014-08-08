var isomorphic = require('isomorphic');
var request = isomorphic.Request;

module.exports = function (callback) {
  callback(null, 'todos/new');
};
