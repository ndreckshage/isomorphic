var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));
var port = process.env.PORT || 3030;

var routes = require('./app/routes');
var Router = require('./app/router');
var router = new Router(routes);
app.use(router.middleware());

var apiPort = process.env.API_PORT || 3031;
var api = require('./lib/api');
app.use('/api', api.middleware(apiPort));

api.listen(apiPort);
app.listen(port);
