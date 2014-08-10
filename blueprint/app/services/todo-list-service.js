var isomorphic = require('isomorphic');
module.exports.fetchIndex = function () {
  return new isomorphic.Promise(function (resolve, reject) {
    isomorphic.request.get('/posts.json', function (err, res) {
      // res.body
      res = {data: { todo_lists: ['groceries', 'work', 'something'] }};
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};
