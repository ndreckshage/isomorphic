var gulp = require('./../gulp');
var handleError = require('./../utils/error');
var combine = require('gulp-concat');
var stylus = require('gulp-stylus');
var watch = require('gulp-watch');

/**
 * build css with stylus
 * @TODO automatic files in config?
 */
gulp.task('stylus', function () {
  gulp.src(['./todomvc-common/base.css', './assets/stylesheets/index.styl'])
    .pipe(stylus())
    .pipe(combine('styles.css'))
    .pipe(gulp.dest('./public'))
    .on('error', handleError('Stylus'));
});

/**
 * rebuild css
 * @TODO automatic files in config?
 */
gulp.task('watch-stylus', ['stylus'], function () {
  gulp.watch('./assets/stylesheets/**/*', ['stylus']);
});
