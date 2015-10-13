var gulp = require('gulp');
var child_process = require('child_process');

// Include plugins
var jshint = require('gulp-jshint');
var nodemon = require('gulp-nodemon');

// Execute shell command
function exec(command) {
  child_process.exec(command, function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    if (err) {
    	console.log("Execution error: " + err);
    }
  });
}

// Stop development database
function stopdb() {
	exec('mongo admin --eval "db.shutdownServer();"');
}

// Lint JavaScript code with jsthint
gulp.task('lint', function lint() {
	return gulp
			.src('app/**/*.js')
			.pipe(jshint())
			.pipe(jshint.reporter('default'));
});

// Spin up development database
gulp.task('startdb', function stardb(done) {
	var ip = process.env.IP || '127.0.0.1';
	exec('mongod --bind_ip=' + ip + ' --dbpath=data --smallfiles --nojournal --rest --httpinterface');
	process.once('SIGINT', function () {
		stopdb();
	});
});

// Spin down development database
gulp.task('stopdb', function() {
	stopdb();
});

// Start application server and monitor for changes
gulp.task('monitor', function monitor(done) {
	var monitor = nodemon({
		script: 'server.js',
		ext: 'js',
		ignore: ['./node_modules/**']
	});
	// .on('exit', function() {
	// 	console.log("Exiting nodemon");
	// });
});

gulp.task('default', ['startdb', 'monitor']);
