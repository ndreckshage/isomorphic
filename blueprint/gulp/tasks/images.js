var gulp = require('gulp'),
    changed = require('gulp-changed'),
    imagemin = require('gulp-imagemin');

gulp.task('images', function() {
	var dest = './public/images';
	return gulp.src('./assets/images/**')
		.pipe(changed(dest))
		.pipe(imagemin())
		.pipe(gulp.dest(dest));
});
