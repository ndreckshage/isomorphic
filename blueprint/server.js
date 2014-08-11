var express = require('express');
var isomorphic = require('isomorphic');
var app = express();

require('node-jsx').install({extension: '.jsx'});
app.use(express.static(__dirname + '/public'));

app.use(isomorphic.router.middleware());
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
