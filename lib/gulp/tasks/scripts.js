var gulp = require('./../gulp');
var handleError = require('./../utils/error');
var exposeJS = require('./../utils/exposeJS');
var chalk = require('chalk');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var reactify = require('reactify');
var watchify = require('watchify');
var browserSync = require('browser-sync');

/**
 * build (or rebuild) application with browserify (or watchify)
 * @param {boolean} watch
 */
function scripts (watch) {
  var bundler = browserify('./app/client.js', {
    debug: true,
    cache: {}
  });

  if (watch) {
    bundler = watchify(bundler)
  }

  exposeJS('./app').forEach(function (file) {
    bundler.require(file.path, {
      expose: file.expose
    });
  });

  bundler.transform(reactify);

  /**
   * build application
   * @param {string} file
   */
  function rebundle (file) {
    var stream = bundler.bundle();
    if (file) {
      console.log('[gulp]', chalk.cyan('[watchify] rebundled due to:'), chalk.green(file));
    }

    stream.on('error', handleError('Browserify'));
    stream = stream.pipe(source('isomorphic.js'));
    return stream.pipe(gulp.dest('./public'));
  };

  bundler.on('update', rebundle);
  return rebundle();
}

/**
 * launch browserify
 */
gulp.task('scripts', function () {
  return scripts(false);
});

/**
 * launch watchify
 */
gulp.task('watch-scripts', function () {
  return scripts(true);
});
