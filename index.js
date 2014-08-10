// react and flux dispatcher
module.exports.React = require('react');
module.exports.Dispatcher = require('flux').Dispatcher;

// client takes over server.
module.exports.isomorphize = require('./lib/isomorphize');

// wraps require to serve what client / server needs
module.exports.require = require('./lib/require');

// interact with api endpoint on client / server (uses Superagent)
module.exports.request = require('./lib/request');

// promises to use with superagent in services.
module.exports.Promise = require('es6-promise').Promise;

// initializes routes on client / server (uses Director)
module.exports.Router = require('./lib/router').Router;
