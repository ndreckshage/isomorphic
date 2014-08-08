var isomorphic = require('isomorphic');
var request = isomorphic.Request;

module.exports = function (callback) {
  request.get('/posts.json', function (err, res) {
    res.body = {data: { todo_lists: ['groceries', 'work', 'something'] }};
    callback(null, 'index', { data: res.body.data });
  });
};
