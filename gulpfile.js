var gulp     = require('gulp'),
    rename   = require('gulp-rename'),
    uglify   = require('gulp-uglify'),
    minifyCss   = require('gulp-minify-css'),
    coffee   = require('gulp-coffee'),
    gutil    = require('gulp-util'),
    compass  = require('gulp-compass'),
    notify   = require('gulp-notify'),
    browserSync = require('browser-sync');

gulp.task('compass', function() {
    gulp.src('./src/sass/*.sass')
        .pipe(compass({
            config_file: './src/sass/config.rb',
            css: './public/css',
            sass: './src/sass'
        }))
        .pipe(minifyCss())
        .pipe(notify("<%= file.relative %>"))
        .pipe(gulp.dest('./public/css'))
        .pipe(browserSync.stream());
});

gulp.task('coffee', function() {
    gulp.src('./src/coffee/*.coffee')
        .pipe(coffee({
            bare: true
        }))
        .on('error', gutil.log)
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(notify("<%= file.relative %>"))
        .pipe(gulp.dest('./public/js'))
        .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    browserSync.init({
        server: {
            baseDir:"./"
        }
    });
    gulp.watch('./src/sass/**/*.s*ss', ['compass']);
    gulp.watch('./src/coffee/**/*.coffee', ['coffee']);
});

gulp.task('default', ['compass', 'coffee', 'watch']);