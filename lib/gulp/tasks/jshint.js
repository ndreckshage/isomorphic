var gulp = require('./../gulp');
var handleError = require('./../utils/error');
var react = require('gulp-react');
var jshint = require('gulp-jshint');
var jshintStylish = require('jshint-stylish');
var watch = require('gulp-watch');

/**
 * JSHint
 */
gulp.task('jshint', function () {
  return gulp.src('./app/**/*')
  .pipe(react())
  .pipe(jshint())
  .pipe(jshint.reporter(jshintStylish))
  .pipe(jshint.reporter('fail'))
  .on('error', handleError('jshint'));
});

/**
 * Watch JSHint
 */
gulp.task('watch-jshint', function() {
  gulp.watch('./app/**/*', ['jshint']);
});
