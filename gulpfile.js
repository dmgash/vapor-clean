/*******************************************************************************
REQUIRED MODULES
*******************************************************************************/
var gulp = require('gulp'); // Core Gulp Module
var gutil = require('gulp-util'); // Gulp Utilities Module
var uglify = require('gulp-uglify'); // JS Minification Module
var uglifycss = require('gulp-uglifycss'); // CSS Minification Module
var rename = require('gulp-rename'); // File Renaming Utility
var sass = require('gulp-sass'); // Sass Compiler Module
var autoprefixer = require('gulp-autoprefixer'); // CSS Vendor Prefix Module
var sourcemaps = require('gulp-sourcemaps'); // CSS Sourcemap Generator Module
var plumber = require('gulp-plumber'); // Error Handling for Watch Tasks
var browsersync = require('browser-sync'); // Browsersync utility.
var reload = browsersync.reload; // Browsersync Reload Function

/*******************************************************************************
FILE PATH GLOBS - references the key files and locations used throughout
subsequent tasks.
*******************************************************************************/
var paths = {
  scripts: ['./Public/js/**/*.js', '!./Public/js/**/*.min.js'],
  scriptDest: './Public/js',
  sass: './Public/scss/*.scss',
  cssDest: './Public/css',
  css: ['./Public/css/**/*.css', '!./Public/css/**/*.min.css'],
  html: './Resources/Views/**/*.html'
};

/*******************************************************************************
SCRIPTS TASK - selects each .js file - except those already minified - from the
source location, minifies them, adds '.min' as a suffix to the file names, and
drops them into the receiving location.
*******************************************************************************/
gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(paths.scriptDest));
});

/*******************************************************************************
SASS TASK - selects each .scss file from the source location, initiates the
sourcemap library, passes each file through the Sass compiler, applies vendor
prefixes, writes the completed sourcemaps to the maps directory, and drops each
file into the receiving location.
*******************************************************************************/
gulp.task('sass', function() {
  return gulp.src(paths.sass)
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer({browsers: 'last 3 versions'}))
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest(paths.cssDest));
});

/*******************************************************************************
HTML TASK - basic task to detect changes to any of the project HTML
files. Utilised by Browsersync.
*******************************************************************************/
gulp.task('html', function() {
  return gulp.src(paths.html)
  .pipe(reload({stream:true}));
});

/*******************************************************************************
CSS TASK - selects each .css file - except those already minified - from the
source location, minifies them, adds '.min' as a suffix to the file names, and
drops them into the receiving location.
*******************************************************************************/
gulp.task('css', ['sass'], function() {
  return gulp.src(paths.css)
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(uglifycss())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(paths.cssDest))
    .pipe(reload({stream:true}));
});

/*******************************************************************************
BROWSERSYNC TASK - base configuration for Browsersync utility. Sets project
base directory for monitoring.
*******************************************************************************/
gulp.task('browser-sync', function() {
  browsersync({
    proxy: "localhost:8080",
    port: 8181
  });
});

/*******************************************************************************
WATCH TASK - monitors the js, scss, and css directories for changes, triggering
the associated task when a change is detected.
*******************************************************************************/
gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.sass, ['css']);
  gulp.watch(paths.html, ['html']);
});

/*******************************************************************************
DEFAULT TASK - triggers each task when the 'gulp' command is first executed
on the command line. The watch task continues to run until the process is exited
by the user.
*******************************************************************************/
gulp.task('default', ['scripts', 'css', 'browser-sync', 'html', 'watch']);

/*******************************************************************************
ERROR HANDLING FUNCTION - basic error handling function passed into gulp-plumber
and triggered whenever an error occurs. Makes the command line 'beep' and print
the error details to the console.
*******************************************************************************/
var onError = function (err) {
  gutil.beep();
  console.log(err);
};
