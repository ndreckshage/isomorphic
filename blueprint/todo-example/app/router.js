module.exports = function (match) {
  match('/todos/new', 'todos/new');
  match('/todos/:id', 'todos/show');
  match('/', 'index');
};
