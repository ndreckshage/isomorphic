var isomorphic = require('isomorphic');
var TodoService = isomorphic.require('services/todo-service');

module.exports.render = 'todos/show';
module.exports.promise = function () {
  return TodoService.fetchIndex();
};
