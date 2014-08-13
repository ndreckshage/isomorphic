/**
 * @jsx React.DOM
 */
var isomorphic = require('isomorphic');
var React = isomorphic.React;
var Footer = isomorphic.require('components/partials/footer');
var TodoApp = isomorphic.require('components/todos/partials/todo-app');

module.exports = React.createClass({
  render: function () {
    return (
      <div>
        <section id="todoapp">
          <TodoApp renderer={this.props.renderer} />
        </section>
        <Footer />
      </div>
    );
  }
});
