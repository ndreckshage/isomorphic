/**
 * @jsx React.DOM
 */
var isomorphic = require('isomorphic');
var React = isomorphic.React;
var Footer = isomorphic.require('components/footer');
var TodoApp = isomorphic.require('components/todos/todo-app');
var TodoActions = isomorphic.require('actions/todo-actions');

module.exports = React.createClass({
  componentDidMount: function () {
    TodoActions.fetchedIndex(this.props.data);
  },

  render: function () {
    console.log('indexjsx', this.props)
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
