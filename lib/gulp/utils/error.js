var chalk = require('chalk');
var notify = require('gulp-notify');

/**
 * Log errors from Gulp
 * @param {string} task
 */
function handleError (task) {
  return function (err) {
    console.log(chalk.red(err));
    notify.onError(task + ' failed, check the logs..')(err);
  };
}

module.exports = handleError;
