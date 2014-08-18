var gulp = require('./../gulp');

/**
 * build
 */
gulp.task('build', ['styles'], function () {
  console.log('build', process.argv);
});
