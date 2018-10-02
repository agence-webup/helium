const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const bsync = require('browser-sync').create();
const ghPages = require('gulp-gh-pages');
const cleanCss = require('gulp-clean-css');

function reload(done) {
    bsync.reload();
    done();
}

gulp.task('sass', () => {
    return gulp.src('./src/sass/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCss())
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream());
});

gulp.task('copy:html', function () {
    return gulp.src('./src/*.html')
        .pipe(gulp.dest('./dist'));
});

gulp.task('deploy', function () {
    return gulp.src('./dist/**/*')
        .pipe(ghPages());
});

gulp.task('watch', () => {
    bsync.init({
        server: {
            baseDir: "dist",
            directory: false,
            index: "index.html"
        },
        open: false
    });

    gulp.watch('./src/sass/**/*', gulp.series('sass'));
    gulp.watch('./src/**/*.html', gulp.series('copy:html', reload));
});

gulp.task('default', gulp.series('sass', 'copy:html'));
