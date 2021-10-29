/* global require, exports */

const babel = require('gulp-babel');
const cleancss = require('gulp-clean-css');
const concat = require('gulp-concat');
const connect = require('gulp-connect');
const dashdash = require('@greenpeace/dashdash');
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const eslint = require('gulp-eslint');
const fs = require('fs');
const gulp = require('gulp');
const js = require('gulp-uglify-es').default;
const replace = require('gulp-replace');
const scss = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const stylelint = require('gulp-stylelint');
const template = require('gulp-template');

const mediaQueryAliases = {
  '(max-width: 576px)': 'mobile-only',
  '(min-width: 576px)': 'small-and-up',
  '(min-width: 768px)': 'medium-and-up',
  '(min-width: 992px)': 'large-and-up',
  '(min-width: 1200px)': 'x-large-and-up',
};

const postcss_plugins = [
  autoprefixer(),
  dashdash({ mediaQueryAliases, mediaQueryAtStart: false }),
]

const api = 'countries.js';
const dest = './dist/';
const files_array = [
  'index.html',
  'version.txt',
  'favicon.ico'
];
const img_array = 'static/img/*';
const countries_json = 'static/scss/master-theme/templates/countries.json';
const urls_json = 'urls.json';
const js_array = [
  dest + api,
  'static/js/app.js',
  'static/js/dropdown.js',
  'static/js/geoip.js',
  'static/js/country_list.js',
  'static/js/redirect.js'
];
const js_404_array = [
  dest + api,
  'static/js/l10n.js'
];
const path_js = 'static/js/*.js';
const style_scss = 'static/scss/**/*.scss';
const style = 'static/scss/style.scss';
const style_404 = 'static/scss/404.scss';

function replace_static() {
  const static = fs.readFileSync('STATIC.txt', 'utf8').trim();

  return gulp.src('./404.html')
    .pipe(replace('{{static}}', static))
    .pipe(gulp.dest(dest));
}

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
    .pipe(postcss(postcss_plugins))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(dest + 'static/'))
    .pipe(connect.reload());
}

function style_sass_404() {
  return gulp.src(style_404)
    .pipe(sourcemaps.init())
    .pipe(scss().on('error', scss.logError))
    .pipe(postcss(postcss_plugins))
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

function uglify_404() {
  return gulp.src(js_404_array)
    .pipe(sourcemaps.init())
    .pipe(concat('static/404.js'))
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
  const apiJSON = fs.readFileSync(countries_json);
  const apiDict = JSON.parse(apiJSON);
  const urlDict = JSON.parse(fs.readFileSync(dest + urls_json));

  return gulp.src('static/api/' + api)
    .pipe(template({api: JSON.stringify(apiDict), urlList: JSON.stringify(urlDict)}))
    .pipe(gulp.dest(dest));
}

function countries(done) {
  const apiJSON = fs.readFileSync(countries_json);
  const apiDict = JSON.parse(apiJSON);

  urls = Object.entries(apiDict).map((letter) => {
    return letter[1].map((country) => {
      if (country.url) {
        return [[country.url.trim().replace(/\/$/, ''), country.name.replace('Greenpeace', '').trim()]];
      }
      if (country.lang) {
        return country.lang.map((lang) => [
          lang.url.trim().replace(/\/$/, ''),
          country.name.replace('Greenpeace', '').trim()
        ]);
      }
    });
  }).flat(2);

  if(!fs.existsSync(dest)) {
    fs.mkdirSync(dest);
  }
  fs.writeFileSync(dest + urls_json, JSON.stringify(urls));
  done();
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

function a11y_test(done) {
  const pa11y = require('pa11y');
  const report_dest = './pa11y';
  const url = 'http://localhost:9000';

  pa11y(url).then(async results => {
    const reporter = require('pa11y-reporter-html');
    const html = await reporter.results(results, url);
    if(!fs.existsSync(report_dest)) {
      fs.mkdirSync(report_dest);
    }
    fs.writeFileSync(report_dest + '/report.html', html);
    fs.writeFileSync(report_dest + '/report.json', JSON.stringify(results));
  });
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
exports.lint = gulp.parallel(lint_css, lint_js);
exports.countries = gulp.series(countries, inject);
exports.build = gulp.series(lint_css, style_sass, style_sass_404, uglify, uglify_404, img, files, replace_static);
exports.test = gulp.series(a11y_test);
exports.default = gulp.series(watch, serve);
