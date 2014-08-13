var isomorphic = require('isomorphic');
var TodoListActions = isomorphic.require('actions/todo-list-actions');
var TodoListService = isomorphic.require('services/todo-list-service');

module.exports.render = 'todos/show';
module.exports.promise = function (id) {
  return TodoListService.fetchShow(id).then(function (data) {
    TodoListActions.showFetched(data);
    return data;
  });
};
