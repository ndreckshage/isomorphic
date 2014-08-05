/**
 * Small wrapper around `superagent` module to make it easier to consume
 * the API the same way on client & server.
 */
var superagent = require('superagent');
var isServer = typeof window === 'undefined';

/**
 * Proxy each method to `superagent`, formatting the URL.
 */
['get', 'post', 'put', 'path', 'del'].forEach(function (method) {
  exports[method] = function (path) {
    var args = Array.prototype.slice.call(arguments, 1);
    return superagent[method].apply(null, [formatUrl(path)].concat(args));
  };
});

// @TODO pull this into api/env config
function formatUrl (path) {
  var url;
  if (isServer) {
    // Prepend host and port of the API server to the path.
    url = 'http://isomorphic-api.frontendperformance.com' + path;
  } else {
    // @TODO mount point variable
    // Prepend `/api` to relative URL, to proxy to API server.
    url = '/api' + path;
  }
  return url;
}
