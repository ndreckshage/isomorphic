module.exports = function (match) {
  match('/', 'index');
  match('/posts', 'posts/index');
  match('/posts/:id', 'posts/show');
}
