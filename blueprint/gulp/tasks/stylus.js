var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    concat = require('gulp-concat'),
    handleErrors = require('../util/handleErrors');

gulp.task('stylus', function () {
  // @TODO automatic
  gulp.src(['./todomvc-common/base.css', './assets/stylesheets/index.styl'])
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('./public'))
    .on('error', handleErrors);
});
