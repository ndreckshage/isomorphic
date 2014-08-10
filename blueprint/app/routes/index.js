var isomorphic = require('isomorphic');
var TodoListService = isomorphic.require('services/todo-list-service');

module.exports.criticalCSS = 'index';
module.exports.render = 'index';
module.exports.promise = function () {
  return TodoListService.fetchIndex();
};
