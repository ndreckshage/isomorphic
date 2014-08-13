/**
 * @jsx React.DOM
 */
var isomorphic = require('isomorphic');
var React = isomorphic.React;
var Footer = isomorphic.require('components/partials/footer');
var TodoApp = isomorphic.require('components/todos/partials/todo-app');
var TodoListActions = isomorphic.require('actions/todo-list-actions');

module.exports = React.createClass({
  /**
   * display component with initial state
   */
  getInitialState: function () {
    TodoListActions.showState(this.props);
    return null;
  },

  render: function () {
    return (
      <div>
        <section id="todoapp">
          <TodoApp todoList={this.props.todo_list} renderer={this.props.renderer} />
        </section>
        <Footer />
      </div>
    );
  }
});
