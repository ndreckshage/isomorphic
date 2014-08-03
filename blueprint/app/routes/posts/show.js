var request = require('isomorphic').Request;

module.exports = function (id, callback) {
  console.log('post: ' + id);

  request.get('/posts/' + id + '.json', function(err, res) {
    if (err) return callback(err);

    var post = res.body;
    callback(null, 'posts/show', post);
  });
};
