var gulp = require('gulp')
var nodemon = require('gulp-nodemon');
var isomorphic = require('isomorphic');
var browserify = require('browserify');
var reactify = require('reactify');
var notify = require('gulp-notify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var chalk = require('chalk');
var combine = require('gulp-concat');
var stylus = require('gulp-stylus');
var react = require('gulp-react');
var fs = require('fs');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var jshint = require('gulp-jshint');
var jshintStylish = require('jshint-stylish');
var watch = require('gulp-watch');
var browserSync = require('browser-sync');

// @TODO convert back to individual files

// @TODO cache buster
// @TODO environments
// @TODO uglify
// @TODO envify
// @TODO css min (csso)
// @TODO css auto prefixer
// @TODO css lint

/**
 * Log errors from Gulp
 * @param {string} task
 */
function handleError (task) {
  return function (err) {
    console.log(chalk.red(err));
    notify.onError(task + ' failed, check the logs..')(err);
  };
}

/**
 * CSS Related Tasks
 * @TODO automatic files in config?
 */
gulp.task('stylus', function () {
  gulp.src(['./todomvc-common/base.css', './assets/stylesheets/index.styl'])
    .pipe(stylus())
    .pipe(combine('styles.css'))
    .pipe(gulp.dest('./public'))
    .on('error', handleError('Stylus'));
});

/**
 * CSS Related Tasks
 * @TODO automatic files in config?
 */
gulp.task('watch-stylus', function () {
  gulp.watch('./assets/stylesheets/**/*', ['stylus']);
});

/**
 * Images Related Tasks
 */
gulp.task('images', function () {
  var dest = './public/images';
  gulp.src('./assets/images/**')
    .pipe(changed(dest))
    .pipe(imagemin())
    .pipe(gulp.dest(dest));
});

/**
 * Localserver
 */
gulp.task('nodemon', function () {
  nodemon({
  	script: './server.js',
  	ext: 'jade js jsx'
  }).on('restart', function (files) {
    console.log('[gulp]', chalk.yellow('[nodemon] restarted due to:'), chalk.green(files));
    browserSync.reload();
  });
});

/**
 * Livereload
 * @TODO broken?
 */
// gulp.task('browser-sync', ['nodemon'], function() {
//   browserSync({
//     proxy: "localhost:3030",
//     notify: true
//   });
// });

/**
 * JSHint
 */
gulp.task('jshint', function () {
  return gulp.src('./app/**/*')
  .pipe(react())
  .pipe(jshint())
  .pipe(jshint.reporter(jshintStylish))
  .pipe(jshint.reporter('fail'))
  .on('error', handleError('jshint'));
});

/**
 * Watch JSHint
 */
gulp.task('watch-jshint', function() {
  gulp.watch('./app/**/*', ['jshint']);
});

/**
 * Build (or rebuild) application with Browserify (or Watchify)
 * @param {boolean} watch
 */
function scripts (watch) {
  var bundler = browserify('./app/client.js', {
    debug: true,
    cache: {}
  });

  if(watch) {
    bundler = watchify(bundler)
  }

  isomorphic.Utils.walk('./app').forEach(function (file) {
    bundler.require(file.path, {
      expose: file.expose
    });
  });

  bundler.transform(reactify);

  /**
   * Build Application
   * @param {string} file
   */
  function rebundle (file) {
    var stream = bundler.bundle();
    if (file) {
      console.log('[gulp]', chalk.cyan('[watchify] rebundled due to:'), chalk.green(file));
    }

    stream.on('error', handleError('Browserify'));
    stream = stream.pipe(source('scripts.js'));
    return stream.pipe(gulp.dest('./public'));
  };

  bundler.on('update', rebundle);
  return rebundle();
}

/**
 * Launch browserify
 */
gulp.task('scripts', function() {
  return scripts(false);
});

/**
 * Launch watchify
 */
gulp.task('watch-scripts', function() {
  return scripts(true);
});

/**
 * Default task to build + serve dev.
 * @TODO add more build options
 */
gulp.task('default', ['nodemon', 'jshint', 'watch-jshint', 'watch-scripts', 'watch-stylus']);
