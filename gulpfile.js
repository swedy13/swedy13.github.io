var gulp								= require('gulp');
var pug								 = require('gulp-pug');
var flatten					= require('gulp-flatten');
var htmlMin     = require('gulp-htmlmin');
var stylus						= require('gulp-stylus');
var prefix						= require('gulp-autoprefixer');
var cssMin      = require('gulp-clean-css');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var image       = require('gulp-image');
var del									= require('del');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var child							= require('child_process');


// COMPILE TASKS
gulp.task('html', function() {
				return gulp.src('_source/**/*.pug')
															.pipe(pug())
															.pipe(flatten())
															.pipe(htmlMin())
															.pipe(gulp.dest('_includes'));
});

gulp.task('css', function() {
				return gulp.src('_source/main.styl')
															.pipe(stylus({
																			includePaths: ['css'],
																			onError: browserSync.notify
															}))
															.pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
															.pipe(cssMin())
															.pipe(gulp.dest('_site/assets/css'))
															.pipe(browserSync.reload({stream:true}));
});

gulp.task('js', function() {
				return gulp.src('assets/js/*')
															.pipe(concat('main.js'))
															.pipe(uglify())
															.pipe(gulp.dest('_site/assets/js'))
															.pipe(browserSync.reload({stream:true}));
});


// BUILD TASKS
gulp.task('jekyll-build', function(done) {
				return child.spawn('jekyll.bat', ['build'], {stdio: 'inherit'})
																.on('close', done);
});

gulp.task('serve', function(callback) {
				browserSync({
								server: {
												baseDir: '_site'
								},
								notify: false
				});
});

gulp.task('reload', ['jekyll-build'], function() {
				browserSync.reload();
});


// RUN TASKS
// Optimize
gulp.task('img', function() {
				return gulp.src('assets/images/**')
															.pipe(image({
																			pngquant: true,
																			optipng: true,
																			zopflipng: true
															}))
															.pipe(gulp.dest('assets/images'));
});

// Run Variable
gulp.task('run', function(callback) {
				runSequence(
								'html',
								'css',
								'js',
								callback
				);
});

// Development
gulp.task('default', function() {
				runSequence(
								'run',
								'jekyll-build',
								'serve',
								'watch'
				);
});


gulp.task('watch', function() {
				gulp.watch('_source/**/*.pug', ['html']);
				gulp.watch(['index.html', '_layouts/*.html', '_includes/*'], ['reload']);
				gulp.watch('_source/**/*.styl', ['css']);
				gulp.watch('assets/js/**', ['js']);
});
