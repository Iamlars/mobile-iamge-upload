var gulp = require('gulp'),
    sass = require('gulp-sass');

gulp.task('styles', function() {
  gulp.src(['./src/css/demo.scss'])
      .pipe(sass())
      .pipe(gulp.dest('./dist/css'))
});

gulp.task('watch', function() {
  gulp.watch('src/css/demo.scss', ['styles']);
});
