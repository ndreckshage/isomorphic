/**
 * @jsx React.DOM
 */
var isomorphic = require('isomorphic');
var React = isomorphic.React;
var Footer = isomorphic.require('components/partials/footer');
var TodoListStore = isomorphic.require('stores/todo-list-store');
var TodoListActions = isomorphic.require('actions/todo-list-actions');
var PagePerformance = isomorphic.require('components/partials/performance');

/**
 * return all todo lists in store
 * @return {object}
 */
function getTodoListState () {
  var todoLists = [];
  var todoListsObj = TodoListStore.getAll();

  for (var i in todoListsObj) {
    todoLists.push(todoListsObj[i]);
  }

  return {
    todoLists: todoLists,
    server: '000',
    client: '000',
    total: '000'
  };
}

module.exports = React.createClass({
  /**
   * display component with initial state
   */
  getInitialState: function () {
    TodoListActions.indexState(this.props);
    return getTodoListState();
  },

  /**
   * component in to dom
   */
  componentDidMount: function () {
    TodoListStore.addChangeListener(this._onChange);
  },

  /**
   * component out of dom
   */
  componentWillUnmount: function() {
    TodoListStore.removeChangeListener(this._onChange);
  },

  /**
   * react render component
   */
  render: function () {
    return (
      <div className={"todo-lists"}>
        <h1>todos<span className={"header-plus"}>+</span></h1>
        <PagePerformance renderer={this.props.renderer} />
        <div className={"todo-list-links"}>
          {this.state.todoLists.map(function (todoList) {
            return <a href={"/todos/" + todoList.id} className={"todo-list"} key={todoList.id}>{todoList.id}</a>;
          })}
          <div className={"new-list-contain"}>
            <a href="/todos/new" className={"todo-list new-list"}>new</a>
          </div>
        </div>
        <Footer />
      </div>
    );
  },

  /**
   * event handler for 'change' events coming from the TodoListStore
   */
  _onChange: function () {
    this.setState(getTodoListState());
  }
});
