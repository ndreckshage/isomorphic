var gulp = require('gulp'),
    watchify = require('watchify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    nodemon = require('gulp-nodemon'),
    source = require('vinyl-source-stream'),
    stylus = require('gulp-stylus');

gulp.task('browserify', function () {
  var bundler = watchify({
    insertGlobals: true,
    transform: ['hbsfy'],
    entries: ['./app/entry.js'],
		extensions: ['.js', '.hbs']
  });
  var bundle = function () {
    return bundler
      .bundle()
      .pipe(source('scripts.js'))
      .pipe(gulp.dest('./public/'));
  }
  bundler.on('update', bundle);
  return bundle();
});

gulp.task('stylus', function () {
  gulp.src([
    './assets/stylesheets/vendor/bootstrap.min.css',
    './assets/stylesheets/index.styl'
  ])
    .pipe(stylus())
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('./public'));
});

gulp.task('watch', function () {
  gulp.watch('./assets/stylesheets/**', ['stylus']);
});

gulp.task('concurrent', function () {
  nodemon({ script: 'index.js', ext: 'js' })
    .on('start', ['watch', 'browserify'])
    .on('change', ['watch', 'browserify'])
    .on('restart', function () {
      console.log('restarted!');
    });
});

gulp.task('build', ['browserify', 'stylus']);
gulp.task('serve', ['build', 'concurrent'])
gulp.task('default', ['serve']);
