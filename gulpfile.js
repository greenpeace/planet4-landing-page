/* global require, exports */

const gulp = require('gulp');
const stylelint = require('gulp-stylelint');
const eslint = require('gulp-eslint');
const backstop = require('backstopjs');
const connect = require('gulp-connect');

const path_js = 'static/js/*.js';
const path_css = 'static/css/*.css';

function lint_css() {
  return gulp.src(path_css)
    .pipe(stylelint({
      reporters: [{ formatter: 'string', console: true}]
    }));
}

function lint_js() {
  return gulp.src(path_js)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}

function watch() {
  gulp.watch(path_css, gulp.series(lint_css));
  gulp.watch(path_js, gulp.series(lint_js));
}

function backstop_reference(done) {
  backstop('reference', {config: './backstop.js'});
  done();
}

function backstop_test(done) {
  backstop('test', {config: './backstop.js'});
  done();
}

function serve(done) {
  connect.server({
    root: './',
    livereload: true,
    port: '9000'
  });
  done();
}

exports.backstop_reference = gulp.series(serve, backstop_reference);
exports.backstop_test = gulp.series(serve, backstop_test);
exports.watch = watch;
exports.test = gulp.parallel(lint_css, lint_js);
exports.default = gulp.series(lint_css, lint_js, serve);
