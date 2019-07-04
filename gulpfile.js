/* global require, exports */

const babel = require('gulp-babel');
const cleancss = require('gulp-clean-css');
const concat = require('gulp-concat');
const connect = require('gulp-connect');
const eslint = require('gulp-eslint');
const fs = require('fs');
const gulp = require('gulp');
const js = require('gulp-uglify-es').default;
const request = require('request');
const scss = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const stylelint = require('gulp-stylelint');
const template = require('gulp-template');

const api = 'countries.js';
const dest = './dist/';
const files_array = [
  'index.html',
  'version.txt',
  'favicon.ico'
];
const img_array = 'static/img/*';
const json = 'countries.json';
const js_array = [
  dest + api,
  'static/js/app.js',
  'static/js/dropdown.js',
  'static/js/geoip.js',
  'static/js/country_list.js'
];
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
    .pipe(gulp.dest(dest + 'static/'))
    .pipe(connect.reload());
}

function uglify() {
  return gulp.src(js_array)
    .pipe(sourcemaps.init())
    .pipe(concat('static/main.js'))
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(js())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(dest))
    .pipe(connect.reload());
}

function img() {
  return gulp.src([img_array])
    .pipe(gulp.dest(dest + 'static/img/'));
}

function files() {
  return gulp.src(files_array)
    .pipe(gulp.dest(dest));
}

function inject() {
  const apiJSON = fs.readFileSync(dest + json);
  const apiDict = JSON.parse(apiJSON);

  return gulp.src('static/api/' + api)
    .pipe(template({api: JSON.stringify(apiDict)}))
    .pipe(gulp.dest(dest));
}

function countries() {
  const api = fs.readFileSync('API.txt', 'utf8').trim();
  if(!fs.existsSync(dest)) {
    fs.mkdirSync(dest);
  }
  return request(api)
    .pipe(fs.createWriteStream(dest + json));
}

function watch(done) {
  gulp.watch(style_scss, gulp.series(lint_css, style_sass));
  gulp.watch(path_js, gulp.series(lint_js, uglify));
  done();
}

function backstop_reference(done) {
  const backstop = require('backstopjs');
  backstop('reference', {config: './backstop.js'});
  done();
}

function backstop_test(done) {
  const backstop = require('backstopjs');
  backstop('test', {config: './backstop.js'});
  done();
}

function serve(done) {
  connect.server({
    root: './dist',
    livereload: true,
    port: '9000'
  });
  done();
}

exports.backstop_reference = backstop_reference;
exports.backstop_test = backstop_test;
exports.test = gulp.parallel(lint_css, lint_js);
exports.countries = gulp.series(countries, inject);
exports.build = gulp.series(lint_css, style_sass, uglify, img, files);
exports.default = gulp.series(watch, serve);
