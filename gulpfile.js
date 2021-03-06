var gulp								= require('gulp');
var browserSync = require('browser-sync');
var noCom       = require('gulp-strip-comments');
var pug								 = require('gulp-pug');
var flatten					= require('gulp-flatten');
var htmlMin     = require('gulp-htmlmin');
var stylus						= require('gulp-stylus');
var prefix						= require('gulp-autoprefixer');
var noCssCom    = require('gulp-strip-css-comments');
var cssMin      = require('gulp-clean-css');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var image       = require('gulp-image');
var child							= require('child_process');
var del									= require('del');
var runSequence = require('run-sequence');

var message = {
				jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};


// COMPILATION
gulp.task('compile-html', function() {
				return gulp.src('_source/**/*.pug')
															.pipe(pug())
															.pipe(flatten())
															.pipe(noCom())
															.pipe(htmlMin())
															.pipe(gulp.dest('_includes'));
});

gulp.task('compile-css', function() {
				return gulp.src('_source/main.styl')
															.pipe(stylus({
																			includePaths: ['css'],
																			onError: browserSync.notify
															}))
															.pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
															.pipe(noCssCom())
															.pipe(cssMin())
															.pipe(gulp.dest('assets/css'));
});


// OPTIMIZATION
// Must run the image task separately (to save load time)
gulp.task('optimize-img', function() {
				return gulp.src('assets/images/**')
															.pipe(image({
																			pngquant: true,
																			optipng: true,
																			zopflipng: true
															}))
															.pipe(gulp.dest('assets/images'));
});


// RELOCATION
gulp.task('move-css', function() {
				return gulp.src('assets/css/main.css')
															.pipe(gulp.dest('_site/assets/css'))
															.pipe(browserSync.reload({stream:true}));
});

gulp.task('move-js', function() {
				return gulp.src('assets/js/**')
															.pipe(noCom())
				           .pipe(uglify())
															.pipe(gulp.dest('_site/assets/js'))
															.pipe(browserSync.reload({stream:true}));
});


// BUILD
gulp.task('jekyll-build', function(done) {
				browserSync.notify(message.jekyllBuild);
				return child.spawn('jekyll.bat', ['build'], {stdio: 'inherit'})
																.on('close', done);
});

gulp.task('reload', ['jekyll-build'], function() {
				browserSync.reload();
});

gulp.task('serve', function(callback) {
				browserSync({
								server: {
												baseDir: '_site'
								},
								notify: false
				});
});


// WATCH
gulp.task('watch', function() {
				gulp.watch('_source/**/*.pug', ['compile-html']);
				gulp.watch(['index.html', '_layouts/*.html', '_includes/*'], ['reload']);
				gulp.watch('_source/**/*.styl', ['compile-css']);
				gulp.watch('assets/css/**', ['move-css']);
				gulp.watch('assets/js/**', ['move-js']);
});


// RUN
gulp.task('run', function(callback) {
				runSequence(
								'compile-html',
								'compile-css',
								'move-css',
								'move-js',
								'jekyll-build',
								'serve',
								callback
				);
});

// Type "gulp" into the terminal to launch gulp.
gulp.task('default', ['run', 'watch']);
