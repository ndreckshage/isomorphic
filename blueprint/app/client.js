var isomorphic = require('isomorphic');
var router = new isomorphic.Router(isomorphic.require('router'));
window.router = router;
router.start();
