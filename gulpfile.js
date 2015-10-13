
// include gulp
var gulp = require('gulp'),

// include plug-ins
    clean = require('gulp-clean'),
    autoprefix = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    strip  = require('gulp-strip-comments'),
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


// JS hint task

gulp.task('styles', function() {
    gulp.src(['./src/css/demo.scss'])
        .pipe(autoprefix())
        //.pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sass())
        //.pipe(sourcemaps.write('.',{sourceMappingURLPrefix: './build/styles'}))
        .pipe(minifycss())
        .pipe(rename('all.min.css'))
        .pipe(rev())
        .pipe(gulp.dest('./dist/css'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('dist'));
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
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(strip ())
        .pipe(rev())
        .pipe(gulp.dest('./dist/js'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('./rev'));
});


gulp.task('usemin', function() {
    return gulp.src('./*.html')
        .pipe(usemin({
            css: [ rev() ],
            //html: [ minifyHtml({ empty: true }) ],
            js: [  rev() ],
            inlinejs: [ uglify() ],
            inlinecss: [ 'concat' ]
        }))
        .pipe(gulp.dest('dist/'));
});



gulp.task('default',function(){
    gulp.src(['./dist/'])
        .pipe(clean());

    gulp.run('styles','scripts','usemin');
});