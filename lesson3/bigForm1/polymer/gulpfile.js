var gulp = require('gulp');
var vulcanize = require('gulp-vulcanize');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var minifyHTML = require('gulp-minify-html');
var minifyInline = require('gulp-minify-inline');
var watch = require('gulp-watch');
var batch = require('gulp-batch');
var concat = require('gulp-concat');

gulp.task('vulcanize-elems', function () {
	return gulp.src('src/polymer-elements/elements.html')
		.pipe(vulcanize({
			abspath: '',
			excludes: [],
			stripExcludes: false
		}))
		.pipe(gulp.dest('dest/polymer-elements/'));
});

gulp.task('compress-js', function() {
	return gulp.src('src/js/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('dest/js'));
});

gulp.task('minify-css', function() {
	return gulp.src('src/css/*.css')
		.pipe(minifyCss({compatibility: 'ie8'}))
		.pipe(gulp.dest('dest/css'));
});

gulp.task('compress-index', function() {
	return gulp.src('src/index.html')
		.pipe(concat('index.html'))
		.pipe(minifyInline())
		.pipe(minifyHTML())
		.pipe(gulp.dest('dest/'));
});

gulp.task('compress-content', function() {
	return gulp.src('src/content.html')
		.pipe(concat('content.html'))
		.pipe(minifyInline())
		.pipe(minifyHTML())
		.pipe(gulp.dest('dest/'));
});

gulp.task('default', ['compress-index', 'compress-content', 'vulcanize-elems', 'compress-js', 'minify-css']);

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