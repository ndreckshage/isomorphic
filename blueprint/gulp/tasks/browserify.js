var browserify = require('browserify'),
		watchify = require('watchify'),
		bundleLogger = require('../util/bundleLogger'),
		handleErrors = require('../util/handleErrors'),
		source = require('vinyl-source-stream'),
		gulp = require('gulp'),
		fs = require('fs');

gulp.task('browserify', function() {
	var bundleMethod = global.isWatching ? watchify : browserify;
	var bundler = bundleMethod({
		entries: ['./app/entry.js']
	});

	var templates = fs.readdirSync('./app/views/');
	templates.forEach(function (template) {
		template = 'app/views/' + template;
	  bundler.require('./' + template, {
	  	expose: template.split('.')[0]
	  })
	});

	var bundle = function() {
		bundleLogger.start();
		return bundler
			.bundle({debug: true})
			.on('error', handleErrors)
			.pipe(source('scripts.js'))
			.pipe(gulp.dest('./public/'))
			.on('end', bundleLogger.end);
	};

	if(global.isWatching) {
		bundler.on('update', bundle);
	}

	return bundle();
});
