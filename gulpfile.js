var gulp = require('gulp');
var concatCSS = require('gulp-concat-css');
var debug = require('gulp-debug');
var sourcemaps = require("gulp-sourcemaps");
var concatJS = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var uncss = require('gulp-uncss');
var rename = require('gulp-rename');
var uglifyJS = require('gulp-uglifyjs');

gulp.task('hello', function() {
  console.log('Hello KSM');
});

gulp.task('concatCSS', function () {
  return gulp.src(['app/css/**/*.css', '!app/css/*main.css'])
    .pipe(debug())
    .pipe(concatCSS("main.css"))
    //.pipe(debug())
    .pipe(cleanCSS({
	    	level: {
	    		2:{restructureRules: true}
	    	}
    	}))
    //.pipe(debug())
    .pipe(rename('main.min.css'))
    .pipe(debug())
    .pipe(uncss({
	html: "dep/index.html"
     }))
    //.pipe(debug())
    .pipe(gulp.dest('dep/css/'));
});

gulp.task('concatJS', function () {
  return gulp.src(['app/js/1*/*.js', '!js/*.main.js'])
    .pipe(debug())
    .pipe(sourcemaps.init())
	.pipe(concatJS('main.js'))
	.pipe(uglifyJS())
	.pipe(rename('main.min.js'))
	.pipe(debug())
	.pipe(sourcemaps.write("."))
    .pipe(gulp.dest('dep/js/'));
});

gulp.task('watcher', function() {
	gulp.watch('app/css/**/*.css', ['concatCSS']);
	gulp.watch('app/js/**/*.js', ['concatJS']);
});

gulp.task('default', ['watcher', 'concatCSS', 'concatJS']);