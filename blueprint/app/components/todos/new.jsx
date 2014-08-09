/**
 * @jsx React.DOM
 */
var isomorphic = require('isomorphic');
var React = isomorphic.React;
var Footer = isomorphic.require('components/partials/footer');
var TodoApp = isomorphic.require('components/todos/partials/todo-app');
// var TodoActions = isomorphic.require('actions/todo-actions');

module.exports = React.createClass({
  render: function () {
    return (
      <div>
        <a href="/">INDEX</a>
        <section id="todoapp">
          <TodoApp />
        </section>
        <Footer renderer={this.props.renderer} />
      </div>
    );
  }
});
