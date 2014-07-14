var express = require('express');
var api = express();

var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer();

var bodyParser = require('body-parser');
var postId = 0;
var posts = [
  {
    id: ++postId,
    title: "Post title 1",
    author: "Post author 1",
    body: "Post content 1",
    created_at: "2014-13-07T12:23:08.044Z"
  },
  {
    id: ++postId,
    title: "Post title 2",
    author: "Post author 2",
    body: "Post content 2",
    created_at: "2014-12-07T12:23:08.044Z"
  }
];

api.use(bodyParser.json());

function find (arr, test) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].id === test) return arr[i];
  }
  return false;
}

api.get('/posts.json', function (req, res) {
  res.send(posts);
});

api.get('/posts/:id.json', function (req, res) {
  var id = parseInt(req.params.id, 10);
  var post = find(posts, id);
  if (post) {
    res.send(post);
  } else {
    res.send(404, {error: 'Not found.'});
  }
});

api.middleware = function (port) {
  return function (req, res, next) {
    proxy.web(req, res, {
      target: 'http://localhost:' + port
    });
  };
};

module.exports = api;
