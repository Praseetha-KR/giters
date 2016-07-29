'use strict';

var gulp = require('gulp'),
    connect = require('gulp-connect'),
    sourcemaps = require('gulp-sourcemaps'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    babelify = require('babelify'),
    htmlreplace = require('gulp-html-replace');

var gc = require('./gulpconfig');

function compilejs(watch) {
    var bundler = watchify(
            browserify('./src/modules/index.js', {debug: true})
            .transform(babelify)
        );

    function rebundle() {
        bundler.bundle()
            .on('error', (err) => {
                console.log(err);
            })
            .pipe(source('app.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({ loadMaps: true}))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('./build/js'));
    }
    if (watch) {
        bundler.on('update', () => {
            console.log('-> bundling...');
            rebundle();
        })
    }
    rebundle();
}
function watch() {
    return compilejs(true);
}
function bundlehtml() {
    var fonts = gc.fonts,
        vendorcss = gc.css.vendor,
        appcss = gc.css.app,
        vendorstartjs = gc.js.start.vendor,
        appjs = gc.js.start.app,
        vendorendjs = gc.js.end.vendor;

    gulp.src('./src/**/*.html')
        .pipe(htmlreplace({
            fonts: fonts,
            vendorcss: vendorcss,
            appcss: appcss,
            vendorstartjs: vendorstartjs,
            appjs: appjs,
            vendorendjs: vendorendjs
        }, {
            keepBlockingTags: true
        }))
        .pipe(gulp.dest('./build'))
        .pipe(connect.reload());
}

gulp.task('html', () => bundlehtml());
gulp.task('watch', () => {
    watch();
    gulp.watch(['./src/**/*.html'], ['html']);
});

gulp.task('server', () => {
    connect.server({
        port: 9999,
        livereload: true
    });
});

gulp.task('default', ['server', 'html', 'watch']);
