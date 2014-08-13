var isomorphic = require('isomorphic');
var TodoListActions = isomorphic.require('actions/todo-list-actions');
var TodoListService = isomorphic.require('services/todo-list-service');

module.exports.criticalCSS = 'index';
module.exports.render = 'index';
module.exports.promise = function () {
  return TodoListService.fetchIndex().then(function (data) {
    TodoListActions.indexFetched(data);
    return data;
  });
};
