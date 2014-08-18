var path = require('path');

// @TODO convert to class

// react and flux dispatcher
module.exports.React = require('react');
module.exports.Dispatcher = require('flux').Dispatcher;

// wraps require to prefix filenames with what client/server expecting.
module.exports.require = require('./lib/require');

// build environment -- @TODO refactor
var isServer = typeof window === 'undefined';
var Environment = require('./lib/environment');
module.exports.Environment = Environment;
environment = new Environment();
environment.activate(isServer ? process.env.ISOMORPHIC_ENV || environment.DEFAULT_ENVIRONMENT : '{{ISOMORPHIC_ENV}}');
module.exports.environment = environment.active;

// client takes over server.
module.exports.isomorphize = require('./lib/isomorphize');

// interact with api endpoint on client / server (uses Superagent)
module.exports.request = require('./lib/request');

// promises to use with superagent in services.
module.exports.Promise = require('es6-promise').Promise;

// initializes routes on client / server (uses Director)
module.exports.router = require('./lib/router');

// performance timing info
module.exports.performance = require('./lib/performance');
