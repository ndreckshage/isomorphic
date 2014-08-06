var isomorphic = require('isomorphic'),
		browserify = require('browserify'),
		watchify = require('watchify'),
		bundleLogger = require('../util/bundleLogger'),
		handleErrors = require('../util/handleErrors'),
		source = require('vinyl-source-stream'),
		gulp = require('gulp'),
		fs = require('fs');

gulp.task('browserify', function() {
	var bundleMethod = global.isWatching ? watchify : browserify;
	var bundler = bundleMethod({
		entries: ['./app/client.js'],
		debug: true
	});

	isomorphic.Utils.walk('./app').forEach(function (file) {
		bundler.require(file.path, {
			expose: file.expose
		});
	});

	var bundle = function() {
		bundleLogger.start();
		return bundler
			.bundle()
			.on('error', handleErrors)
			.pipe(source('scripts.js'))
			.pipe(gulp.dest('./public/'))
			.on('end', bundleLogger.end);
	};

	if (global.isWatching) {
		bundler.on('update', bundle);
	}

	return bundle();
});
