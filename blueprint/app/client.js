var Router = require('./__isomorphic-router');
var routes = require('./router');
var router = new Router(routes);
window.router = router;
router.start();
