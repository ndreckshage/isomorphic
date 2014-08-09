var isomorphic = require('isomorphic');
var router = new isomorphic.Router(isomorphic.require('router'), isomorphic.renderer);
router.start();

/**
 * time for the client to take over
 * @params {string} componentPath
 * @params {object} data
 */
function isomorphize (componentPath, data) {
  var raw = isomorphic.require('components/' + componentPath);
  var component = raw(data);
  router.handleClientRoute(component);
}

window.isomorphic = isomorphic;
window.isomorphize = isomorphize;
