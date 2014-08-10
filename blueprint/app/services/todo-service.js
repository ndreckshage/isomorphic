var isomorphic = require('isomorphic');
module.exports.fetchIndex = function () {
  return new isomorphic.Promise(function (resolve, reject) {
    isomorphic.request.get('/posts.json', function (err, res) {
      // res.body
      res = {data: { todos: { 1407462984491: { id: 1407462984491, complete: false, text: 'example todo' }, 1407464079146: { id: 1407464079146, complete: false, text: 'another' }}}};
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};
