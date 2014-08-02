var apiClient = require('./../../__api_client');

module.exports = function (id, callback) {
  console.log('post: ' + id);

  apiClient.get('/posts/' + id + '.json', function(err, res) {
    if (err) return callback(err);

    var post = res.body;
    callback(null, 'posts/show', post);
  });
};
