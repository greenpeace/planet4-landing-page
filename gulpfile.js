/* global require, exports */

const backstop = require('backstopjs');
const cleancss = require('gulp-clean-css');
const concat = require('gulp-concat');
const connect = require('gulp-connect');
const eslint = require('gulp-eslint');
const gulp = require('gulp');
const scss = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const stylelint = require('gulp-stylelint');
const js = require('gulp-uglify-es').default;

const dest = './static/dist';
const path_js = 'static/js/*.js';
const style_scss = 'static/scss/**/*.scss';
const style = 'static/scss/style.scss';

function lint_css() {
  return gulp.src(style_scss)
    .pipe(stylelint({
      reporters: [{ formatter: 'string', console: true}]
    }))
    .pipe(connect.reload());
}

function lint_js() {
  return gulp.src(path_js)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(connect.reload());
}

function style_sass() {
  return gulp.src(style)
    .pipe(sourcemaps.init())
    .pipe(scss().on('error', scss.logError))
    .pipe(cleancss({rebase: false}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(dest))
    .pipe(connect.reload());
}

function uglify() {
  return gulp.src(path_js)
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(js())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(dest))
    .pipe(connect.reload());
}

function watch(done) {
  gulp.watch(style_scss, gulp.series(lint_css, style_sass));
  gulp.watch(path_js, gulp.series(lint_js, uglify));
  done();
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

exports.backstop_reference = backstop_reference;
exports.backstop_test = backstop_test;
exports.test = gulp.parallel(lint_css, lint_js);
exports.build = gulp.series(lint_css, lint_js, style_sass, uglify);
exports.default = gulp.series(watch, serve);
