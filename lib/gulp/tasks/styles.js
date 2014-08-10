var gulp = require('./../gulp');
var handleError = require('./../utils/error');
var exposeCSS = require('./../utils/exposeCSS');
var combine = require('gulp-concat');
var stylus = require('gulp-stylus');
var watch = require('gulp-watch');

/**
 * gets all critical css entry points and compiles them to public
 */
gulp.task('criticalCSS', function () {
  exposeCSS('./assets/stylesheets/critical').forEach(function (css) {
    gulp.src(css.path)
      .pipe(stylus())
      .pipe(combine(css.expose + '.css'))
      .pipe(gulp.dest('./public'))
      .on('error', handleError('Critical CSS'));
  });
});

/**
 * build css with stylus
 * @TODO automatic files in config?
 */
gulp.task('styles', ['criticalCSS'], function () {
  gulp.src(['./todomvc-common/base.css', './assets/stylesheets/isomorphic.styl'])
    .pipe(stylus())
    .pipe(combine('isomorphic.css'))
    .pipe(gulp.dest('./public'))
    .on('error', handleError('Styles'));
});

/**
 * rebuild css
 * @TODO automatic files in config?
 */
gulp.task('watch-styles', ['styles'], function () {
  gulp.watch('./assets/stylesheets/**/*', ['styles']);
});
