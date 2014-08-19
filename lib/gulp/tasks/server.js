var gulp = require('./../gulp');
var chalk = require('chalk');
var nodemon = require('gulp-nodemon');
var replace = require('gulp-replace');
var args = require('minimist')(process.argv.slice(2));

/**
 * development server
 */
gulp.task('nodemon', function () {
  console.log(chalk.yellow('[nodemon] starting in environment:'), chalk.green(args.name));
  nodemon({
    script: './server.js',
    env: {
      'ISOMORPHIC_ENV': args.name
    },
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
