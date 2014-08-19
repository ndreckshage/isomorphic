/**
 * Small wrapper around `superagent` module to make it easier to consume
 * the API the same way on client & server.
 */
var request = require('request');
var superagent = require('superagent');
var isServer = typeof window === 'undefined';

// @TODO remove
var Environment = require('./../index').Environment;
var environment = new Environment();
environment.activate(isServer ? process.env.ISOMORPHIC_ENV || environment.DEFAULT_ENVIRONMENT : '{{ISOMORPHIC_ENV}}');

var API_MOUNT = '/api';

// @TODO pull this into api/env config
function formatUrl (path) {
  var url;
  if (isServer) {
    url = environment.active.endpoint + path;
  } else {
    url = API_MOUNT + path;
  }
  return url;
}

/**
 * Proxy each method to `superagent`, formatting the URL, and return a promise.
 */
['get', 'post', 'del'].forEach(function (method) {
  module.exports[method] = function (path) {
    var args = Array.prototype.slice.call(arguments, 1);
    return superagent[method].apply(null, [formatUrl(path)].concat(args));
  };
});

/**
 * return function to mount api
 */
module.exports.proxy = function () {
  var request = require('request');
  return function (req, res) {
    req.pipe(request('http://isomorphic-todo-api.frontendperformance.com' + req.url)).pipe(res)
  }
}
