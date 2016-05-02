var gulp								= require('gulp');
var browserSync = require('browser-sync');
var flatten     = require('gulp-flatten');
var stylus						= require('gulp-stylus');
var prefix						= require('gulp-autoprefixer');
var jade								= require('gulp-jade');
var child							= require('child_process');
var del									= require('del');
var runSequence = require('run-sequence');

var message = {
	jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};


// BUILD SEQUENCE
gulp.task('build-site-files', function(callback) {
	runSequence(
		'jade-to-html',
		'stylus-to-css',
		'move-css',
		'move-js',
		/* 'psd-to-img', */
		'move-img',
		'jekyll-build-process',
		'launch-the-server',
		callback
	);
});


// SOURCE CODE CONVERSION
gulp.task('jade-to-html', function() {
	return gulp.src('_source/**/*.jade')
    .pipe(jade())
    .pipe(flatten())
		.pipe(gulp.dest('_includes'));
});

gulp.task('stylus-to-css', function() {
	return gulp.src('_source/main.styl')
		.pipe(stylus({
			includePaths: ['css'],
			onError: browserSync.notify
		}))
		.pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
		.pipe(gulp.dest('assets/css'))
});

gulp.task('move-css', function() {
	return gulp.src('assets/css/main.css')
		.pipe(gulp.dest('_site/assets/css'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('move-js', function() {
	return gulp.src('assets/js/**')
		.pipe(gulp.dest('_site/assets/js'))
		.pipe(browserSync.reload({stream: true}))
});

/* gulp.task('psd-to-img', function() {
	 return gulp.src('_source/_psd/*')
	 .pipe(gulp.dest('assets/img'));
	 }); */

gulp.task('move-img', function() {
	return gulp.src('assets/img/**')
		.pipe(gulp.dest('_site/assets/img'))
		.pipe(browserSync.reload({stream: true}))
});


// CORE FUNCTIONS
gulp.task('jekyll-build-process', function(done) {
	browserSync.notify(message.jekyllBuild);
	return child.spawn('jekyll.bat', ['build'], {stdio: 'inherit'})
		.on('close', done);
});

gulp.task('reload-and-refresh', ['jekyll-build-process'], function() {
	browserSync.reload();
});

gulp.task('launch-the-server', function(callback) {
	browserSync({
		server: {
			baseDir: '_site'
		},
		notify: false
	});
});

gulp.task('watch-for-changes', function() {
	// Jade & HTML
  gulp.watch('_source/**/*.jade', ['jade-to-html']);
  gulp.watch(['index.html', '_layouts/*.html', '_includes/*'], ['reload-and-refresh']);
	// Stylus & CSS
  gulp.watch('_source/**/*.styl', ['stylus-to-css']);
	gulp.watch('assets/css/**',	['move-css']);
	// JavaScript
  gulp.watch('assets/js/**', ['move-js']);
	// Images
	/* gulp.watch('_source/_psd/**', ['psd-to-img']); */
	gulp.watch('assets/img/**', ['move-img']);
});


// DEFAULT TASK
// Type "gulp" in the terminal to start this process
gulp.task('default', ['build-site-files', 'watch-for-changes']);
