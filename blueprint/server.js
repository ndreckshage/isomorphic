var express = require('express');
var isomorphic = require('isomorphic');
var app = express();

require('node-jsx').install({extension: '.jsx'});
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

var router = new isomorphic.Router(require('./app/router'));
app.use(router.middleware());

var api = require('./lib/api');
var apiPort = process.env.API_PORT || 3031;
app.use('/api', api.middleware(apiPort));
api.listen(apiPort);

var port = process.env.PORT || 3030;
app.listen(port);
