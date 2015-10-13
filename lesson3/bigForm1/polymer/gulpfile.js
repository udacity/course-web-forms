var gulp = require('gulp');
var vulcanize = require('gulp-vulcanize');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var watch = require('gulp-watch');
var batch = require('gulp-batch');

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

gulp.task('minify-css', function() {
	return gulp.src('src/css/*.css')
		.pipe(minifyCss({compatibility: 'ie8'}))
		.pipe(gulp.dest('dest/css'));
});

gulp.task('default', ['vulcanize', 'compress', 'minify-css']);

var files = [
	'src/*',
	'src/*/*'
];

gulp.task('watch', function () {
	gulp.start('default');
	watch(files, batch(function (events, done) {
		gulp.start('default', done);
	}));
});