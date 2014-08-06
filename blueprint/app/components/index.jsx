/**
 * @jsx React.DOM
 */
var isomorphic = require('isomorphic');
var React = isomorphic.React;
var Footer = isomorphic.require('components/footer');
var TodoApp = isomorphic.require('components/todos/todo-app');

module.exports = React.createClass({
  render: function () {
    return (
      <div>
        <a href="/test">test</a>
        <section id="todoapp">
          <TodoApp />
        </section>
    		<Footer renderer={this.props.renderer} />
      </div>
    );
  }
});
