var gulp = require('./../gulp');
var handleError = require('./../utils/error');
var jshintStylish = require('jshint-stylish');
var jshint = require('gulp-jshint');
var react = require('gulp-react');
var watch = require('gulp-watch');

/**
 * jshint
 */
gulp.task('jshint', function () {
  return gulp.src('./app/**/*')
    .pipe(react())
    .pipe(jshint())
    .pipe(jshint.reporter(jshintStylish))
    .pipe(jshint.reporter('fail'));
});

/**
 * watch jshint
 */
gulp.task('watch-jshint', function() {
  gulp.watch('./app/**/*', ['jshint']);
});
