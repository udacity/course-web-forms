var gulp = require('gulp');
var vulcanize = require('gulp-vulcanize');
var minify = require('gulp-minify');
var uglify = require('gulp-uglify');

gulp.task('vulcanize', function () {
	return gulp.src('src/index.html')
		.pipe(vulcanize({
			abspath: '',
			excludes: [],
			stripExcludes: false
		}))
		.pipe(gulp.dest('dest'));
});

gulp.task('compress', function() {
	return gulp.src('src/js/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('dest/js'));
});

gulp.task('minify', function() {
	return gulp.src('src/css/*.css')
		.pipe(minify())
		.pipe(gulp.dest('dest/css'));
});

gulp.task('default', ['vulcanize', 'compress', 'minify']);