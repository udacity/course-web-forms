var gulp = require('gulp');
var watch = require('gulp-watch');
var batch = require('gulp-batch');
var concat = require('gulp-concat');
var copy = require('gulp-copy');

var jsApplicationFiles = [
	'../../../etc/grader/grader.js',
	'execution_files/unit_tests.js'
]

gulp.task('js-app', function () {
	return gulp.src(jsApplicationFiles)
		.pipe(concat('js_application.js'))
		.pipe(gulp.dest('dest'));
});

var verbatimCopy = [
	'execution_files/student.js',
	'../../../etc/grader/src/index.html',
	'../../../etc/grader/src/js/iframe.js',
	'../../../etc/grader/src/js/app.js'
]

gulp.task('copy', function () {
	return gulp.src(verbatimCopy)
	  .pipe(copy('dest', {prefix: 9}));
})

var iFrameFilesCorrect = [
	'../../../etc/grader/src/iframe-start.html',
	'../solution/index.html',
	'../../../etc/grader/src/iframe-middle.html',
	'execution_files/student.html',
	'../../../etc/grader/src/iframe-end.html'
]

var iFrameFilesIncorrect = [
	'../../../etc/grader/src/iframe-start.html',
	'../start/index.html',
	'../../../etc/grader/src/iframe-middle.html',
	'execution_files/student.html',
	'../../../etc/grader/src/iframe-end.html'
]

gulp.task('create-iframe-correct', function () {
	return gulp.src(iFrameFilesCorrect)
		.pipe(concat('iframe-correct.html'))
		.pipe(gulp.dest('dest'));
});

gulp.task('create-iframe-incorrect', function () {
	return gulp.src(iFrameFilesIncorrect)
		.pipe(concat('iframe-incorrect.html'))
		.pipe(gulp.dest('dest'));
});

gulp.task('default', ['js-app', 'copy', 'create-iframe-correct', 'create-iframe-incorrect']);

var files = [
	'src/*',
	'src/*/*',
	'execution_files/*',
	'../../../etc/grader/*',
	'../../../etc/grader/src/*',
	'../../../etc/grader/src/js/*'
];

gulp.task('watch', function () {
	gulp.start('default');
	watch(files, batch(function (events, done) {
		gulp.start('default', done);
	}));
});