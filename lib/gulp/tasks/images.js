var gulp = require('./../gulp');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');

/**
 * move and compress images
 */
gulp.task('images', function () {
  var dest = './public/images';
  gulp.src('./assets/images/**')
    .pipe(changed(dest))
    .pipe(imagemin())
    .pipe(gulp.dest(dest));
});
