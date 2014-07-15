var express = require('express');
var app = express();

require('node-jsx').install({extension: '.jsx'});
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

var routes = require('./app/routes');
var Router = require('./app/router');
var router = new Router(routes);
app.use(router.middleware());

var api = require('./lib/api');
var apiPort = process.env.API_PORT || 3031;
app.use('/api', api.middleware(apiPort));
api.listen(apiPort);

var port = process.env.PORT || 3030;
app.listen(port);
