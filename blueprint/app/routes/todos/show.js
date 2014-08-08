var isomorphic = require('isomorphic');
var request = isomorphic.Request;

module.exports = function (id, callback) {
  request.get('/posts.json', function (err, res) {
    res.body = {data: { todos: { 1407462984491: { id: 1407462984491, complete: false, text: 'example todo' }, 1407464079146: { id: 1407464079146, complete: false, text: 'another' }}}};
    callback(null, 'todos/show', { data: res.body.data });
  });
};
