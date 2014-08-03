var request = require('isomorphic').Request;

module.exports = function (callback) {
  console.log('posts');

  request.get('/posts.json', function (err, res) {
    if (err) {
      return callback(err);
    }

    var posts = res.body;
    callback(null, 'posts/index', {
      posts: posts
    });
  });
};
