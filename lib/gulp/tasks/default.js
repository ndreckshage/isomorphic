var gulp = require('./../gulp');
var chalk = require('chalk');

/**
 * disable default task. use 'isomorphic server' or gulp specific tasks
 */
gulp.task('default', function () {
  console.log(chalk.red('Please enter a valid task name or run \'isomorphic server\''));
});
