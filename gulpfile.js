var gulp        = require('gulp'),
    rename      = require('gulp-rename'),
    uglify      = require('gulp-uglify'),
    minifyCss   = require('gulp-minify-css'),
    coffee      = require('gulp-coffee'),
    gutil       = require('gulp-util'),
    compass     = require('gulp-compass'),
    notify      = require('gulp-notify'),
    browserSync = require('browser-sync'),
    path        = {
        sass: './src/sass/',
        coffee: './src/coffee/',
        js: './public/js/',
        css: './public/css/'
    };

gulp.task('compass', function() {
    gulp.src(path.sass + '**/*.sass')
        .pipe(compass({
            config_file: path.sass + 'config.rb',
            css: path.css,
            sass: path.sass
        }))
        .pipe(minifyCss())
        .pipe(notify("<%= file.relative %>"))
        .pipe(gulp.dest(path.css))
        .pipe(browserSync.stream());
});

gulp.task('coffee', function() {
    gulp.src(path.coffee + '**/*.coffee')
        .pipe(coffee({
            bare: true
        }))
        .on('error', gutil.log)
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(notify("<%= file.relative %>"))
        .pipe(gulp.dest(path.js))
        .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    browserSync.init({
        server: {
            baseDir:"./"
        }
    });
    gulp.watch(path.sass + '**/*.s*ss', ['compass']);
    gulp.watch(path.coffee+ '**/*.coffee', ['coffee']);
});

gulp.task('default', ['compass', 'coffee', 'watch']);