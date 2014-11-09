var gulp = require('gulp');
var lab = require('gulp-lab');

gulp.task('default', ['test', 'test-watch']);

gulp.task('test', function() {
  return gulp.src('test').pipe(lab());
});

gulp.task('test-watch', function() {
  return gulp.watch(['lib/**/*.*', 'test/**/*.*'], ['test']);
});
