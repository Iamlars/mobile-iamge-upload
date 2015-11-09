// include gulp
var gulp = require('gulp'),

    // include plug-ins
    clean = require('gulp-clean'),
    autoprefix = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    strip = require('gulp-strip-comments'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    minifycss = require('gulp-minify-css'),
    rev = require('gulp-rev'),
    //revCollector = require('gulp-rev-collector'),
    usemin = require('gulp-usemin'),
    order = require("gulp-order");



gulp.task('dev', ['clean'], function() {
    gulp.start([
        'dev:js',
        'dev:css'
    ]);
});


gulp.task('clean',function(){
    gulp.src(['./dist/'])
        .pipe(clean());
})


gulp.task('dev:css',function(){
       gulp.src(['./src/css/demo.scss'])
        .pipe(autoprefix())
        .pipe(sass())
        .pipe(rename('all.css'))
        .pipe(gulp.dest('./dist/css'))
})


gulp.task('dev:js', function () {
    gulp.src('./src/*.js')
        // .pipe(gulp.dest('dist/js'))
        .pipe(rename('all.js'))
        // .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));
});







// JS hint task

gulp.task('styles', function() {
    gulp.src(['./src/css/demo.scss'])
        .pipe(autoprefix())
        .pipe(sass())
        .pipe(rename('all.css'))
        .pipe(gulp.dest('./dist/css'))
});

gulp.task('scripts', function() {
    gulp.src("src/js/*.js")
        .pipe(order([
            'toBlob.js',
            'lrz.js',
            'cropper.min.js',
            'demo.js'
        ]))
        .pipe(concat('all-a.js'))
        .pipe(rename('all.js'))
        // .pipe(uglify())
        .pipe(gulp.dest('./dist/js'))
});



gulp.task('default', function() {
    gulp.src(['./dist/'])
        .pipe(clean());

    gulp.run('styles', 'scripts');
});
