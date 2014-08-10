var gulp = require('./../gulp');
var chalk = require('chalk');
var nodemon = require('gulp-nodemon');

/**
 * development server
 */
gulp.task('nodemon', function () {
  nodemon({
    script: './server.js',
    ext: 'jade js jsx'
  }).on('restart', function (files) {
    console.log('[gulp]', chalk.yellow('[nodemon] restarted due to:'), chalk.green(files));
    // @TODO broken?
    // browserSync.reload();
  });
});

/**
 * live reload
 * @TODO broken?
 */
// gulp.task('browser-sync', ['nodemon'], function() {
//   browserSync({
//     proxy: "localhost:3030",
//     notify: true
//   });
// });

gulp.task('server', ['images', 'jshint', 'watch-jshint', 'watch-scripts', 'watch-styles', 'nodemon']);
