const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const bsync = require('browser-sync').create();
const ghPages = require('gulp-gh-pages');
const cleanCss = require('gulp-clean-css');
const concat = require('gulp-concat');

function reload(done) {
    bsync.reload();
    done();
}

gulp.task('sass', () => {
    return gulp.src('./src/sass/helium-base.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCss())
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(gulp.dest('./dist/css'))
        .pipe(bsync.stream());
});

gulp.task('js', function () {
    return gulp.src('./src/js/*.js')
        .pipe(concat('helium-base.js'))
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('copy:html', function () {
    return gulp.src('./src/*.html')
        .pipe(gulp.dest('./dist'));
});

gulp.task('css:vendors', function () {
    return gulp.src([
        'node_modules/datatables.net-dt/css/jquery.dataTables.min.css',
        'node_modules/dropmic/dist/dropmic.css',
        'src/vendors/slim/slim.min.css'
        ])
        .pipe(concat('helium-vendors.css'))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('js:vendors', function () {
    return gulp.src([
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/datatables.net/js/jquery.dataTables.min.js',
        'node_modules/dropmic/dist/dropmic.js',
        'src/vendors/slim/slim.kickstart.min.js'
        ])
        .pipe(concat('helium-vendors.js'))
        .pipe(gulp.dest('./dist/js'));
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
    gulp.watch('./src/js/**/*', gulp.series('js'));
    gulp.watch('./src/**/*.html', gulp.series('copy:html', reload));
});

gulp.task('default', gulp.series('sass', 'copy:html'));
gulp.task('vendors', gulp.parallel('css:vendors', 'js:vendors'));
