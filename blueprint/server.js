var express = require('express');
var isomorphic = require('isomorphic');
var app = express();

require('node-jsx').install({extension: '.jsx'});
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

var router = new isomorphic.Router(require('./app/router'));
app.use(router.middleware());

var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer();

function api () {
  return function (req, res, next) {
    proxy.web(req, res, {
      target: 'http://isomorphic-api.frontendperformance.com:3000'
    });
  };
};

app.use('/api', api());

var port = process.env.PORT || 3030;
app.listen(port);
