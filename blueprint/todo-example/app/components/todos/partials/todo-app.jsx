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

/**
 * This component operates as a "Controller-View".  It listens for changes in
 * the TodoStore and passes the new data to its children.
 */
var isomorphic = require('isomorphic');
var React = isomorphic.React;

var Footer = isomorphic.require('components/todos/partials/footer');
var Header = isomorphic.require('components/todos/partials/header');
var MainSection = isomorphic.require('components/todos/partials/main-section');
var TodoStore = isomorphic.require('stores/todo-store');

/**
 * Retrieve the current TODO data from the TodoStore
 */
function getTodoState (todoList) {
  if (todoList) {
    return {
      allTodos: TodoStore.getAll(todoList.id),
      areAllComplete: TodoStore.areAllComplete(todoList.id)
    };
  } else {
    return {
      allTodos: [],
      areAllComplete: false
    };
  }
}

var TodoApp = React.createClass({

  getInitialState: function() {
    return getTodoState(this.props.todoList);
  },

  componentDidMount: function() {
    TodoStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    TodoStore.removeChangeListener(this._onChange);
  },

  /**
   * @return {object}
   */
  render: function() {
  	return (
      <div>
        <Header renderer={this.props.renderer} todoList={this.props.todoList} />
        <MainSection
          allTodos={this.state.allTodos}
          areAllComplete={this.state.areAllComplete}
        />
        <Footer allTodos={this.state.allTodos} />
      </div>
  	);
  },

  /**
   * Event handler for 'change' events coming from the TodoStore
   */
  _onChange: function() {
    this.setState(getTodoState(this.props.todoList));
  }

});

module.exports = TodoApp;
