var isomorphic = require('isomorphic');
var AppDispatcher = isomorphic.require('dispatcher/app-dispatcher');
var TodoListConstants = isomorphic.require('constants/todo-list-constants');
var EventEmitter = require('events').EventEmitter;
var merge = require('react/lib/merge');

var CHANGE_EVENT = 'change';
var _todoLists = {};

var TodoListStore = merge(EventEmitter.prototype, {
  /**
   * Get the entire collection of TodoList
   * @return {object}
   */
  getAll: function () {
    return _todoLists;
  },

  /**
   * Update react
   */
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

AppDispatcher.register(function (payload) {
  switch (payload.action.actionType) {
    case TodoListConstants.TODO_LIST_INDEX_STATE:
    case TodoListConstants.TODO_LIST_INDEX_FETCHED:
      payload.action.data.todo_lists.forEach(function (todoList) {
        _todoLists[todoList.id] = todoList;
      });
      break;
    case TodoListConstants.TODO_LIST_SHOW_STATE:
    case TodoListConstants.TODO_LIST_SHOW_FETCHED:
      var todoList = payload.action.data.todo_list;
      _todoLists[todoList.id] = todoList;
      break;
    case TodoListConstants.TODO_LIST_CREATE:
      _todoLists[payload.action.text] = { id: payload.action.text, todo_ids: [] };
      isomorphic.router.setRoute('/todos/' + payload.action.text);
      break;
    default:
      return true;
  }
  TodoListStore.emitChange();
  return true;
});

module.exports = TodoListStore;
