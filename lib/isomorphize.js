module.exports = function (componentPath, data) {
  if (typeof window !== 'undefined') {
    var Router = require('./router').Router;
    var router = new Router('client');
    router.start();
    router.serverToClient(componentPath, data);
  }
};
