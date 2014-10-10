var gulp = require('./../gulp');
var args = require('minimist')(process.argv.slice(2));
var chalk = require('chalk');

var handleError = require('./../utils/error');
var exposeJS = require('./../utils/exposeJS');

var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gulpIf = require('gulp-if');

var browserSync = require('browser-sync');
var replace = require('gulp-replace');
var reactify = require('reactify');
var watchify = require('watchify');
var uglifyify = require('uglifyify');
var uglify = require('gulp-uglify');
var envify = require('envify');

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

  bundler.require('./environment.json', {
    expose: 'environment'
  });

  exposeJS('./app').forEach(function (file) {
    bundler.require(file.path, {
      expose: file.expose
    });
  });

  bundler.transform(reactify);
  bundler.transform({ global: true }, envify);
  bundler.transform({ global: true }, uglifyify);

  /**
   * build application
   * @param {string} file
   */
  function rebundle (file) {
    var stream = bundler.bundle();
    if (file) {
      console.log('[gulp]', chalk.cyan('[watchify] rebundled due to:'), chalk.green(file));
    }

    console.log('[gulp]', chalk.cyan('[watchify] assets'), chalk.red('building'));
    stream
      .on('error', handleError('Browserify'))
      .pipe(source('isomorphic.js'))
      .pipe(buffer())
      .pipe(replace('{{ISOMORPHIC_ENV}}', args.name))
      .pipe(gulpIf(args.uglify, uglify()))
      .pipe(gulp.dest('./public')).on("end", function () {
        console.log('[gulp]', chalk.cyan('[watchify] assets'), chalk.green('complete'));
      });
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
