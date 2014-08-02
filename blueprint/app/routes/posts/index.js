var apiClient = require('./../../__api_client');

module.exports = function (callback) {
  console.log('posts');

  apiClient.get('/posts.json', function (err, res) {
    if (err) {
      return callback(err);
    }

    var posts = res.body;
    callback(null, 'posts/index', {
      posts: posts
    });
  });
};
