"use strict";

const gulp = require('gulp');
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const ghPages = require('gulp-gh-pages');
const cleanCss = require('gulp-clean-css');

gulp.task('less', function() {
    gulp.src('./src/less/style.less')
        .pipe(less())
        .pipe(cleanCss())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./dist/css'))
        .pipe(reload({
            stream: true
        }));
});


gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "dist",
            directory: false,
            index: "index.html"
        },
        open: false
    });
});

gulp.task('copy', [
    'copy:html',
]);

gulp.task('copy:html', function() {
    gulp.src('./src/*.html')
        .pipe(gulp.dest('./dist'));
});


gulp.task('bs-reload', function() {
    browserSync.reload();
});


gulp.task('deploy', function() {
    return gulp.src('./dist/**/*')
        .pipe(ghPages());
});


gulp.task('watch', ['browser-sync'], function() {
    gulp.watch('./src/less/**/*', ['less']);
    gulp.watch('./src/**/*.html', ['copy', 'bs-reload']);

});

gulp.task('default', ['less', 'copy']);
