var express = require('express');
var isomorphic = require('isomorphic');
var app = express();

require('node-jsx').install({extension: '.jsx'});
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

var router = new isomorphic.Router(require('./app/router'));
app.use(router.middleware());
// app.use(isormophic.router())

// @TODO temp
isomorphic.proxy = function () {
  var request = require('request');
  return function (req, res) {
    req.pipe(request('http://isomorphic-api.frontendperformance.com' + req.url)).pipe(res)
  }
}

app.use('/api', isomorphic.proxy());
// app.use(API_MOUNT, isomorphic.proxy())

var port = process.env.PORT || 3030;
app.listen(port);
