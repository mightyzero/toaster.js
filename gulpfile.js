var gulp = require('gulp');

// Include plugins
var jshint = require('gulp-jshint');
var nodemon = require('gulp-nodemon');

// Lint JavaScript code with jsthint
gulp.task('lint', function() {
	return gulp
			.src('app/**/*.js')
			.pipe(jshint())
			.pipe(jshint.reporter('default'));
});

gulp.task('default', function() {
	nodemon({
		script: 'server.js',
		ext: 'js',
		ignore: ['./node_modules/**']
	});
});
