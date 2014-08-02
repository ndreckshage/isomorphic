var browserify = require('browserify'),
		watchify = require('watchify'),
		bundleLogger = require('../util/bundleLogger'),
		handleErrors = require('../util/handleErrors'),
		source = require('vinyl-source-stream'),
		gulp = require('gulp'),
		fs = require('fs');

var recursiveWalk = require('./../../app/__isomorphic_util_walk');
var routes = recursiveWalk('./app/routes');
var components = recursiveWalk('./app/components');
var insert = require('gulp-insert');

var exposedRoutes = [];
routes.forEach(function (route) {
	exposedRoutes.push(route.expose);
});

gulp.task('browserify', function() {
	var bundleMethod = global.isWatching ? watchify : browserify;
	var bundler = bundleMethod({
		entries: ['./app/client.js'],
		debug: true
	});

	routes.forEach(function (route) {
		bundler.require(route.path, {
			expose: route.expose
		});
	});

	components.forEach(function (component) {
		bundler.require(component.path, {
			expose: component.expose
		});
	});

	var bundle = function() {
		bundleLogger.start();
		return bundler
			.bundle()
			.on('error', handleErrors)
			.pipe(source('scripts.js'))
			// .pipe(insert.prepend('var exposedRoutes="test";'))
			.pipe(gulp.dest('./public/'))
			.on('end', bundleLogger.end);
	};

	if (global.isWatching) {
		bundler.on('update', bundle);
	}

	return bundle();
});
