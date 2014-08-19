var express = require('express');
var isomorphic = require('isomorphic');
var app = express();

var PORT = process.env.PORT || 3030;
var API_MOUNT = process.env.API_MOUNT || '/api';

// @TODO move somewhere
require('node-jsx').install({extension: '.jsx'});

app.use(express.static(__dirname + '/public'));
app.use(isomorphic.router.middleware());
app.use(API_MOUNT, isomorphic.request.proxy());
app.listen(PORT);
