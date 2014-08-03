var isomorphic = require('isomorphic');
var router = new isomorphic.Router(require('./router'));
window.router = router;
router.start();
