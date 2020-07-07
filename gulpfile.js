/* eslint-env node */

const gulp = require('gulp')
const Gulpy = require('@agence-webup/gulpy')
const ghpages = require('gh-pages')
const path = require('path')
const concat = require('gulp-concat')
const size = require('gulp-size')

// config
const gulpy = new Gulpy({
  publicFolder: 'dist',
  manifest: 'dist/rev-manifest.json',
  npmManifest: 'dist/npm-manifest.json'
})

const clean = gulpy.clean(['dist/css', 'dist/js'])

const sass = gulpy.sass('src/sass/helium-base.scss', 'dist/css')
const js = gulpy.bundle('src/js/*.js', 'dist/js', 'helium-base.js')

const copyHtml = gulpy.copy('src/*.html', 'dist')

const copyNpm = gulpy.copyNpm('dist/node_modules')

const copyVendors = gulpy.copy('src/vendors/**/*', 'dist/vendors/')

const cssVendorsBundle = function () {
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
}

const jsVendorsBundle = function () {
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
}

// export
exports.default = gulp.series(clean, gulp.series(sass, js, copyHtml, copyNpm, copyVendors, cssVendorsBundle, jsVendorsBundle))

exports.watch = gulpy.watch()

exports.deploy = function (cb) {
  ghpages.publish(path.join(process.cwd(), 'dist'), cb)
}
