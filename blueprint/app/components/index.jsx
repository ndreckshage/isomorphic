/**
 * @jsx React.DOM
 */
var isomorphic = require('isomorphic');
var React = isomorphic.React;

module.exports = React.createClass({
  render: function () {
    var str ="";
    this.props.data.todo_lists.forEach(function (todoList) {
      str+="<a href='/todos/" + todoList + "'>" + todoList + " list</a>";
    });

    // @TODO dont do it this way...

    return (
      <div>
        <h1>Todo lists</h1>
        <div dangerouslySetInnerHTML={{__html: str}} />
        <h2>Create a new list</h2>
        <a href="/todos/new">New list</a>
      </div>
    );
  }
});
