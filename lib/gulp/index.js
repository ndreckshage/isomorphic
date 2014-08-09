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
var fs = require('fs');
var CORE_TASKS_DIR = path.join(__dirname, 'tasks');
var BLUEPRINT_TASKS_DIR = path.join(process.cwd(), 'gulp', 'tasks');

fs.readdirSync(CORE_TASKS_DIR).forEach(function (task) {
  require(path.join(CORE_TASKS_DIR, task));
});

if (fs.existsSync(BLUEPRINT_TASKS_DIR)) {
  fs.readdirSync(BLUEPRINT_TASKS_DIR).forEach(function (task) {
    require(path.join(BLUEPRINT_TASKS_DIR, task));
  });
}
