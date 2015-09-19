'use strict';

var gulp = require('gulp');
var os = require('os');
var connect = require('gulp-connect'); //Run a local dev server
var open = require('gulp-open'); //Open a url in web browser
var browserify = require('browserify'); // Bundles JS
var reactify = require('babelify');  // Transforms React JSX to JS
var source = require('vinyl-source-stream'); // Use conventional text streams with Gulp
var concat = require('gulp-concat'); //Concatenates files
var lint = require('gulp-eslint'); //Lint JS files, including JSX


var config = {
	port: 7005,
	devBaseUrl: 'http://localhost',
	paths: {
		html: './src/*.html',
		js: './src/**/*.js',
		images: './src/images/*',
		css: [
      		'./src/style.css'
    	],
		dist: './dist',
        mainJs: './src/app.js'
	}
};

//Start a local dev server
gulp.task('connect', function(){
	connect.server({
		root:['dist'],
		port: config.port,
		base: config.devBaseUrl,
		livereload:true
	});
});

var browser = os.platform() === 'linux' ? 'google-chrome' : (
  os.platform() === 'darwin' ? 'google chrome' : (
  os.platform() === 'win32' ? 'chrome' : 'firefox'));

gulp.task('open', ['connect'], function(){
	gulp.src('./dist/index.html')
	.pipe(open({uri: config.devBaseUrl + ':' + config.port + '/', app: browser}));
});

gulp.task('html', function(){
	gulp.src(config.paths.html)
	.pipe(gulp.dest(config.paths.dist))
	.pipe(connect.reload());
});

gulp.task('js', function() {
	browserify(config.paths.mainJs)
		.transform(reactify)
		.bundle()
		.on('error', console.error.bind(console))
		.pipe(source('bundle.js'))
		.pipe(gulp.dest(config.paths.dist + '/scripts'))
		.pipe(connect.reload());
});

gulp.task('css', function() {
	gulp.src(config.paths.css)
		.pipe(concat('bundle.css'))
		.pipe(gulp.dest(config.paths.dist + '/css'));
});

//Migrates images to the dist folder
gulp.task('images', function(){
	gulp.src(config.paths.images)
	.pipe(gulp.dest(config.paths.dist + '/images'))
	.pipe(connect.reload());

	//publish favicon
	gulp.src('./src/favicon.ico')
	.pipe(gulp.dest(config.paths.dist));
});

gulp.task('lint', function() {
	return gulp.src(config.paths.js)
		.pipe(lint({config: 'eslint.config.json'}))
		.pipe(lint.format());
});

gulp.task('watch', function() {
	gulp.watch(config.paths.html, ['html']);
	gulp.watch(config.paths.js, ['js', 'lint']);
	gulp.watch(config.paths.css, ['css']);
});

gulp.task('default', ['html', 'js', 'css', 'images', 'lint', 'open', 'watch' ]);