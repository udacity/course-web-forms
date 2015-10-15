var gulp = require('gulp');
var watch = require('gulp-watch');
var batch = require('gulp-batch');
var concat = require('gulp-concat');
var copy = require('gulp-copy');

var jsApplicationFiles = [
	'../../../etc/js_grader.js',
	'execution_files/unit_tests.js'
]

gulp.task('js-app', function () {
	return gulp.src(jsApplicationFiles)
		.pipe(concat('js_application.js'))
		.pipe(gulp.dest('dest'));
});

// gulp.task('copy-student-js', function () {
// 	return gulp.src('execution_files/student.js')
// 		.pipe(concat('student.js'))
// 		.pipe(gulp.dest('dest/js'));
// });

// gulp.task('copy-index-html', function () {
// 	return gulp.src('src/index.html')
// 		.pipe(concat('index.html'))
// 		.pipe(gulp.dest('dest'));
// });

// gulp.task('copy-iframe-js', function () {
// 	return gulp.src('src/js/iframe.js')
// 		.pipe(concat('iframe.js'))
// 		.pipe(gulp.dest('dest/js'));
// });

// gulp.task('copy-app-js', function () {
// 	return gulp.src('src/js/app.js')
// 		.pipe(concat('app.js'))
// 		.pipe(gulp.dest('dest/js'));
// });

var verbatimCopy = [
	'execution_files/student.js',
	'src/index.html',
	'src/js/iframe.js',
	'src/js/app.js'
]

gulp.task('copy', function () {
	return gulp.src(verbatimCopy)
	  .pipe(copy('dest', {prefix: 2}));
})

var iFrameFilesCorrect = [
	'src/iframe-start.html',
	'../solution/index.html',
	'src/iframe-middle.html',
	'execution_files/student.html',
	'src/iframe-end.html'
]

var iFrameFilesIncorrect = [
	'src/iframe-start.html',
	'../start/index.html',
	'src/iframe-middle.html',
	'execution_files/student.html',
	'src/iframe-end.html'
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
	'execution_files/*'
];

gulp.task('watch', function () {
	gulp.start('default');
	watch(files, batch(function (events, done) {
		gulp.start('default', done);
	}));
});