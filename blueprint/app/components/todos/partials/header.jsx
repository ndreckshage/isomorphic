/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @jsx React.DOM
 */

var isomorphic = require('isomorphic');
var React = isomorphic.React;

var TodoActions = isomorphic.require('actions/todo-actions');
var TodoListActions = isomorphic.require('actions/todo-list-actions');
var TodoTextInput = isomorphic.require('components/todos/partials/todo-text-input');
var PagePerformance = isomorphic.require('components/partials/performance');

var Header = React.createClass({

  /**
   * @return {object}
   */
  render: function() {
    return (
      <header id="header">
        <h1 onClick={this._goHome}>todos<span className={"header-plus"}>+</span></h1>
        <PagePerformance renderer={this.props.renderer} />
        <TodoTextInput
          id="new-todo"
          placeholder={this.props.todoList ? this.props.todoList.id + '...' : "Enter list name..."}
          onSave={this.props.todoList ? this._onSave : this._onSaveTitle}
        />
      </header>
    );
  },

  _goHome: function () {
    isomorphic.router.setRoute('/');
  },

  /**
   * Event handler called within TodoTextInput.
   * Defining this here allows TodoTextInput to be used in multiple places
   * in different ways.
   * @param {string} text
   */
  _onSave: function(text) {
    if (text.trim()){
      TodoActions.create(this.props.todoList, text);
    }
  },

  /**
   * @param {string} text
   */
  _onSaveTitle: function (text) {
    if (text.trim()){
      TodoListActions.create(text);
    }
  }
});

module.exports = Header;
