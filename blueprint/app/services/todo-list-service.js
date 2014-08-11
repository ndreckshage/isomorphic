var isomorphic = require('isomorphic');
module.exports.fetchIndex = function () {
  return new isomorphic.Promise(function (resolve, reject) {
    isomorphic.request.get('/todo_lists', function (err, res) {
      if (err) {
        reject(err);
      } else {
        resolve(res.body.data);
      }
    });
  });
};

module.exports.fetchShow = function (id) {
  return new isomorphic.Promise(function (resolve, reject) {
    isomorphic.request.get('/todo_lists/' + id, function (err, res) {
      if (err) {
        reject(err);
      } else {
        resolve(res.body.data);
      }
    });
  });
};
