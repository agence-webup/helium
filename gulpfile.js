/* eslint-env node */

const gulp = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const bsync = require('browser-sync').create()
const cleanCss = require('gulp-clean-css')
const concat = require('gulp-concat')
const babel = require('gulp-babel')
const size = require('gulp-size')
const ghpages = require('gh-pages')
const path = require('path')

function reload (done) {
  bsync.reload()
  done()
}

gulp.task('sass', () => {
  return gulp.src('./src/sass/helium-base.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCss())
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest('./dist/css'))
    .pipe(bsync.stream())
})

gulp.task('js', function () {
  return gulp.src('./src/js/*.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(concat('helium-base.js'))
    .pipe(gulp.dest('./dist/js'))
})

gulp.task('copy:html', function () {
  return gulp.src('./src/*.html')
    .pipe(gulp.dest('./dist'))
})

gulp.task('css:vendors', function () {
  return gulp.src([
    'node_modules/datatables.net-dt/css/jquery.dataTables.min.css',
    'node_modules/dropmic/dist/dropmic.css',
    'node_modules/tingle.js/dist/tingle.min.css',
    'node_modules/choices.js/public/assets/styles/choices.min.css',
    'node_modules/quill/dist/quill.snow.css',
    'node_modules/noty/lib/noty.css',
    'src/vendors/slim/slim.min.css'
  ])
    .pipe(size({
      showFiles: true
    }))
    .pipe(concat('helium-vendors.css'))
    .pipe(gulp.dest('./dist/css'))
})

gulp.task('js:vendors', function () {
  return gulp.src([
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/datatables.net/js/jquery.dataTables.min.js',
    'node_modules/dropmic/dist/dropmic.js',
    'src/vendors/slim/slim.kickstart.min.js',
    'node_modules/tingle.js/dist/tingle.js',
    'node_modules/quill/dist/quill.min.js',
    'node_modules/choices.js/public/assets/scripts/choices.min.js',
    'node_modules/noty/lib/noty.min.js',
    'node_modules/feather-icons/dist/feather.min.js',
    'node_modules/axios/dist/axios.min.js',
    'node_modules/cleave.js/dist/cleave.min.js',
    'node_modules/cleave.js/dist/addons/cleave-phone.fr.js'
  ])
    .pipe(size({
      showFiles: true
    }))
    .pipe(concat('helium-vendors.js'))
    .pipe(gulp.dest('./dist/js'))
})

gulp.task('deploy', function (cb) {
  ghpages.publish(path.join(process.cwd(), 'dist'), cb)
})

gulp.task('watch', () => {
  bsync.init({
    server: {
      baseDir: 'dist',
      directory: false,
      index: 'index.html'
    },
    open: false
  })

  gulp.watch('./src/sass/**/*', gulp.series('sass'))
  gulp.watch('./src/js/**/*', gulp.series('js'))
  gulp.watch('./src/**/*.html', gulp.series('copy:html', reload))
})

gulp.task('default', gulp.series('sass', 'copy:html'))
gulp.task('vendors', gulp.series('css:vendors', 'js:vendors'))
