var gulp = require('gulp'),
		nodemon = require('gulp-nodemon');

gulp.task('watch', ['setWatch'], function() {
	gulp.watch('./assets/stylesheets/**', ['stylus']);
	nodemon({
		script: './server.js',
		ext: 'js'
	});
});
