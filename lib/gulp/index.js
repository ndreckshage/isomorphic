/**
 * loads all gulp tasks
 *
 * @TODO cache buster
 * @TODO environments
 * @TODO uglify
 * @TODO envify
 * @TODO css min (csso)
 * @TODO css auto prefixer
 * @TODO css lint
 */
var path = require('path');
var TASKS_DIR = path.join(__dirname, 'tasks');
require('fs').readdirSync(TASKS_DIR).forEach(function (task) {
  require(path.join(TASKS_DIR, task));
});
