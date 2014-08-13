var isomorphic = require('isomorphic');
var AppDispatcher = isomorphic.require('dispatcher/app-dispatcher');
var TodoListConstants = isomorphic.require('constants/todo-list-constants');
isomorphic.require('stores/todo-list-store');

module.exports = {
  /**
   * returned promise for /todo-lists
   * @param {object} data
   */
  indexFetched: function (data) {
    AppDispatcher.handleServerAction({
      actionType: TodoListConstants.TODO_LIST_INDEX_FETCHED,
      data: data
    });
  },

  /**
   * props available in the dom
   * @param {object} data
   */
  indexState: function (data) {
    AppDispatcher.handleViewAction({
      actionType: TodoListConstants.TODO_LIST_INDEX_STATE,
      data: data
    });
  },

  /**
   * returned promise for /todo-lists/:id
   * @param {object} data
   */
  showFetched: function (data) {
    AppDispatcher.handleServerAction({
      actionType: TodoListConstants.TODO_LIST_SHOW_FETCHED,
      data: data
    });
  },

  /**
   * props available in the dom
   * @param {object} data
   */
  showState: function (data) {
    AppDispatcher.handleServerAction({
      actionType: TodoListConstants.TODO_LIST_SHOW_STATE,
      data: data
    });
  },

  /**
   * @param  {string} text
   */
  create: function (text) {
    AppDispatcher.handleViewAction({
      actionType: TodoListConstants.TODO_LIST_CREATE,
      text: text
    });
  }
};
